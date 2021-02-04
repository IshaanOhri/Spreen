const modal = document.getElementById('myModal');
const btn = document.getElementById('share-btn');
const span = document.getElementsByClassName('close')[0];
const startBtn = document.getElementById('start-share');
const stopBtn = document.getElementById('stop-share');
const videoGrid = document.getElementById('video-grid');
const video = document.createElement('video');
video.muted = true;

var peer = new Peer('18bce0265');
var conn = peer.connect('18bce0300');

peer.on('open', function (id) {
	console.log('My peer ID is: ' + id);
	// document.getElementById('my-id').innerHTML = id;
});

// When the user clicks the button, open the modal
btn.onclick = function () {
	modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

function stopScreen(stream) {
	stream.getTracks().forEach((track) => track.stop());
	video.srcObject = null;
	videoGrid.innerHTML = null;

	startBtn.disabled = false;
	stopBtn.disabled = true;
}

function shareScreen() {
	navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
		video.srcObject = stream;

		startBtn.disabled = true;
		stopBtn.disabled = false;

		video.style.width = '50%';
		video.style.height = '50%';

		video.addEventListener('loadedmetadata', () => {
			video.play();
		});

		videoGrid.append(video);

		stopBtn.onclick = () => {
			stopScreen(stream);
		};

		stream.getVideoTracks()[0].onended = function () {
			stopScreen(stream);
		};

		var call = peer.call('18bce0300', stream);

		call.on('stream', function (stream) {
			const video2 = document.createElement('video');
			video2.muted = true;

			video2.srcObject = stream;

			video2.style.width = '50%';
			video2.style.height = '50%';

			video2.addEventListener('loadedmetadata', () => {
				video2.play();
			});
			videoGrid.append(video2);
		});
	});
}

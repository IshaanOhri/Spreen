console.log('Home Page');

const socket = io();

socket.emit('join');

var peer = new Peer();

var conn = peer.connect('another-peers-id');
// on open will be launch when you successfully connect to PeerServer
conn.on('open', function () {
	// here you have conn.id
	conn.send('hi!');
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('share-btn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

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

const videoGrid = document.getElementById('video-grid');
const video = document.createElement('video');
video.muted = true;

function shareScreen() {
	navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
		video.srcObject = stream;

		document.getElementById('start-share').disabled = true;
		document.getElementById('stop-share').disabled = false;

		video.style.width = '50%';
		video.style.height = '50%';

		video.addEventListener('loadedmetadata', () => {
			video.play();
		});
		videoGrid.append(video);

		document.getElementById('stop-share').onclick = () => {
			video.srcObject = null;
			videoGrid.innerHTML = null;
			stream.getTracks().forEach((track) => track.stop());

			document.getElementById('start-share').disabled = false;
			document.getElementById('stop-share').disabled = true;
		};

		stream.getVideoTracks()[0].onended = function () {
			video.srcObject = null;
			videoGrid.innerHTML = null;
			stream.getTracks().forEach((track) => track.stop());

			document.getElementById('start-share').disabled = false;
			document.getElementById('stop-share').disabled = true;
		};
	});
}

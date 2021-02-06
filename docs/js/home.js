const modal = document.getElementById('myModal');
const btn = document.getElementById('share-btn');
const span = document.getElementsByClassName('close')[0];
const startBtn = document.getElementById('start-share');
const stopBtn = document.getElementById('stop-share');
const videoGrid = document.getElementById('video-grid');
const clientStatus = document.getElementById('client-status');
const video = document.createElement('video');
video.muted = true;

let myId;
let clientId = null;

const socket = io();

var peer = new Peer();

socket.on('user-connected', (newUser) => {
	if (clientId === null) {
		clientId = newUser;
		const conn = peer.connect(newUser);
		console.log('Client peer ID is: ' + newUser);
		clientStatus.style.backgroundColor = '#61C454';
		clientStatus.innerHTML = 'Client connected Successfully';
	}
});

peer.on('open', function (id) {
	console.log('My peer ID is: ' + id);
	myId = id;
	socket.emit('join', { roomId: 'ScreenShare', user: id });
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
	video.srcObject = null;
	videoGrid.innerHTML = null;
	stream.getTracks().forEach((track) => track.stop());

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
		video.style.marginLeft = 'auto';
		video.style.marginRight = 'auto';

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

		socket.on('user-disconnected', (disconnectedUser) => {
			console.log('Client peer ID disconnected is: ' + disconnectedUser);
			if (disconnectedUser === clientId) {
				clientId = null;
				clientStatus.style.backgroundColor = '#EE695E';
				clientStatus.innerHTML = 'Client disconnected';
				stopScreen(stream);
			}
		});

		var call = peer.call(clientId, stream);

		// call.on('stream', function (stream) {
		// 	video.srcObject = stream;

		// 	video.style.width = '50%';
		// 	video.style.height = '50%';
		// 	video.style.marginLeft = 'auto';
		// 	video.style.marginRight = 'auto';

		// 	video.addEventListener('loadedmetadata', () => {
		// 		video.play();
		// 	});

		// 	videoGrid.append(video);
		// });
	});
}

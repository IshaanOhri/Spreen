const startBtn = document.getElementById('start-share');
const stopBtn = document.getElementById('stop-share');
const videoGrid = document.getElementById('watch-video-grid');
const video = document.createElement('video');
video.muted = true;

let myId;

const socket = io();

var peer = new Peer();

var conn = peer.connect();

peer.on('open', function (id) {
	console.log('My peer ID is: ' + id);
	myId = id;
	socket.emit('join', { roomId: 'ScreenShare', user: id });
});

peer.on('call', function (call) {
	// Answer the call, providing our mediaStream
	call.answer();

	call.on('stream', function (stream) {
		video.srcObject = stream;

		video.style.width = '100%';
		video.style.height = '100%';
		video.controls = true;

		video.addEventListener('loadedmetadata', () => {
			video.play();
		});

		videoGrid.append(video);

		stream.getVideoTracks()[0].onended = function () {
			stopScreen(stream);
		};
	});
});

function stopScreen(stream) {
	video.srcObject = null;
	videoGrid.innerHTML = null;
	stream.getTracks().forEach((track) => track.stop());

	startBtn.disabled = false;
	stopBtn.disabled = true;
}

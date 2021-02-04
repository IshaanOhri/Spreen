const startBtn = document.getElementById('start-share');
const stopBtn = document.getElementById('stop-share');
const videoGrid = document.getElementById('watch-video-grid');
const video = document.createElement('video');
video.muted = true;

var peer = new Peer('18bce0300');

peer.on('open', function (id) {
	console.log('My peer ID is: ' + id);
	// document.getElementById('my-id').innerHTML = id;
});

peer.on('call', function (call) {
	// Answer the call, providing our mediaStream
	call.answer();

	call.on('stream', function (stream) {
		video.srcObject = stream;

		video.style.width = '100%';
		video.style.height = '100%';

		video.addEventListener('loadedmetadata', () => {
			video.play();
		});
		videoGrid.append(video);
	});
});

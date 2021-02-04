const modal = document.getElementById('myModal');
const btn = document.getElementById('share-btn');
const span = document.getElementsByClassName('close')[0];
const startBtn = document.getElementById('start-share');
const stopBtn = document.getElementById('stop-share');
const videoGrid = document.getElementById('video-grid');
const video = document.createElement('video');
video.muted = true;

var peer = new Peer('18bce0265', { debug: 3 });

peer.on('open', function (id) {
	console.log('My peer ID is: ' + id);
	document.getElementById('my-id').innerHTML = id;
});

// var conn = peer.connect("ishaan_2_18bce0265");

peer.on('connection', function (conn) {
	console.log(conn);
	console.log('connect');

	// document.getElementById("my-id").innerHTML += conn;

	conn.on('open', function () {
		// Receive messages
		conn.on('data', function (data) {
			console.log('Received', data);

			document.getElementById('my-id').innerHTML += data;
		});

		// Send messages
		conn.send('Hello!');
	});
});

// const socket = io();

// // var peer = new Peer('2');

// socket.emit('join', { roomId: 1, userId: 'Sender' });

// socket.on('user-connected', (userId) => {
// 	console.log(`${userId} Connected`);
// });

// var conn = peer.connect('1');
// // on open will be launch when you successfully connect to PeerServer
// conn.on('open', function () {
// 	// here you have conn.id
// 	conn.send('hi!');
// 	console.log('connection');
// });

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

peer.on('call', function (call) {
	// Answer the call, providing our mediaStream
	call.answer();

	call.on('stream', function (stream) {
		// `stream` is the MediaStream of the remote peer.
		// Here you'd add it to an HTML video/canvas element.
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
	});
}

function stopScreen(stream) {
	video.srcObject = null;
	videoGrid.innerHTML = null;
	stream.getTracks().forEach((track) => track.stop());

	startBtn.disabled = false;
	stopBtn.disabled = true;
}

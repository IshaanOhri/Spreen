/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:14:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:30:05
 * @Description: Main driver file for the server
 */

import express, { Application } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { router } from './api/routes';
import { PORT, HOST } from './config';
import logger from './log/config';
import { notFound, responseHandler } from './middleware';

// Initializing Express App
const app: Application = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, './views'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// CORS
app.use(cors());

// Body parser
app.use(express.json());

app.get('/', (req: any, res: any) => {
	res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req: any, res: any) => {
	res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket: any) => {
	socket.io('join-room', (roomId: any, userId: any) => {
		console.log(roomId, userId);
	});
});

// // Import routers
// app.use(router);

// // Not found handler
// app.use(notFound);

// // All response handlers
// app.use(responseHandler);

// Start Express App
app.listen(PORT, HOST, () => {
	logger.info(`🚀 Server running on http://${HOST}:${PORT} 🚀`);
});

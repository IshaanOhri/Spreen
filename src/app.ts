/* eslint-disable prefer-template */
/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:14:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-05 09:55:26
 * @Description: Main driver file for the server
 */

import express, { Application } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { router } from './api/routes';
import { PORT, HOST } from './config';
import logger from './log/config';
import { notFound, responseHandler } from './middleware';

// Initializing Express App
const app: Application = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const server = createServer(app);
const io = new Server(server);

// CORS
app.use(cors());

// Body parser
app.use(express.json());

io.on('connection', (socket: Socket) => {
	socket.on('join', ({ roomId, user }: { roomId: string; user: string }) => {
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connected', user);
		// console.log(roomId, user);

		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('user-disconnected', user);
		});
	});
});

// Import routers
app.use(router);

// Not found handler
app.use(notFound);

// All response handlers
app.use(responseHandler);

// Start Express App
server.listen(PORT, HOST, () => {
	logger.info(`🚀 Server running on http://${HOST}:${PORT} 🚀`);
});

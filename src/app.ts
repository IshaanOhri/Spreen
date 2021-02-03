/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:14:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:30:05
 * @Description: Main driver file for the server
 */

import express, { Application } from 'express';
import cors from 'cors';
import { router } from './api/routes';
import { PORT, HOST } from './config';
import logger from './log/config';
import { notFound, responseHandler } from './middleware';

// Initializing Express App
const app: Application = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Connect to Database
require('./database/database');

// Import routers
app.use('/api/v1', router);

// Not found handler
app.use(notFound);

// All response handlers
app.use(responseHandler);

// Start Express App
app.listen(PORT, HOST, () => {
	logger.info(`🚀 Server running on http://${HOST}:${PORT} 🚀`);
});

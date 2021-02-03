/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 19:16:20
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-04 02:10:02
 * @Description:
 */

import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { status, message } from '../../config';
import { HttpResponse } from '../../handlers';
import { catchAsync } from '../../middleware';

const { networkInterfaces } = require('os');

// Home route
const home = catchAsync(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const nets = networkInterfaces();
		const results = Object.create(null); // Or just '{}', an empty object

		// eslint-disable-next-line no-restricted-syntax
		for (const name of Object.keys(nets)) {
			// eslint-disable-next-line no-restricted-syntax
			for (const net of nets[name]) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === 'IPv4' && !net.internal) {
					if (!results[name]) {
						results[name] = [];
					}
					results[name].push(net.address);
					res.render('home', { ip: results[name][0] });
				}
			}
		}
		// res.sendFile(path.join(__dirname, '../../../public/home.html'));
	}
);

// Watch route
const watch = catchAsync(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		res.render('watch');
	}
);

export { home, watch };

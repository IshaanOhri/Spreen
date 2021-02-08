/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 19:16:20
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-04 02:10:02
 * @Description: Functions for all sharing related routes
 */

import { NextFunction, Request, Response } from 'express';
const { networkInterfaces } = require('os');

// Home route
const home = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const nets = networkInterfaces();
	const results = Object.create(null);

	// eslint-disable-next-line no-restricted-syntax
	for (const name of Object.keys(nets)) {
		// eslint-disable-next-line no-restricted-syntax
		for (const net of nets[name]) {
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
};

// Watch route
const watch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	res.render('watch');
};

export { home, watch };

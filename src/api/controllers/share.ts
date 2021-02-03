/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 19:16:20
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 22:11:42
 * @Description:
 */

import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { status, message } from '../../config';
import { HttpResponse } from '../../handlers';
import { catchAsync } from '../../middleware';

// Home route
const home = catchAsync(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		// res.render('home');
		res.sendFile(path.join(__dirname, '../../../public/home.html'));
	}
);

export { home };

/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:23:21
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:23:21
 * @Description: Defines functions for all miscellaneous routes
 */

import { NextFunction, Request, Response } from 'express';
import { status, message } from '../../config';
import { HttpResponse } from '../../handlers';
import { catchAsync } from '../../middleware';

// Home route
const home = catchAsync(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		next(new HttpResponse(status.ok, null, message.homeRoute));
	}
);

// Health route
const health = catchAsync(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		next(new HttpResponse(status.ok, null, message.healthRoute));
	}
);

export { home, health };

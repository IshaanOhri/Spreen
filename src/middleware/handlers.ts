/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:27:26
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:29:27
 * @Description: Contains all handlers like try/catch, not found and all response handlers
 */

import { Request, Response, NextFunction } from 'express';
import { status, message } from '../config';
import { HttpError, HttpErrorHandler, HttpResponse, HttpResponseHandler } from '../handlers';
import logger from '../log/config';

// try-catch handler
const catchAsync = (fn: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

// No route found
const notFound = (req: Request, res: Response, next: NextFunction) => {
	next(new HttpError(status.notFound, null, message.notFound));
};

// All response handlers
const responseHandler = (response: HttpError | HttpResponse, req: Request, res: Response, next: NextFunction) => {
	if (response instanceof HttpResponse) {
		HttpResponseHandler(response, res);
		return;
	}

	if (!(response instanceof HttpError)) {
		logger.error(response);
		// eslint-disable-next-line no-param-reassign
		response = new HttpError(status.serverError, null, message.serverError);
	}
	HttpErrorHandler(response, res);
};

export { catchAsync, notFound, responseHandler };

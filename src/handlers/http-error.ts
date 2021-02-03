/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:24:40
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:28:41
 * @Description: Contains the HTTP Error Template and HTTP Error Handler
 */

import { Response } from 'express';
import moment from 'moment';
import { IMetadataError } from '../interfaces';

/*
  HTTP Error Template
 */

class HttpError extends Error {
	data: any;

	metadata: IMetadataError;

	constructor(status: number, data: any, error: any) {
		super();
		this.data = data;
		this.metadata = {
			success: false,
			status,
			error,
			timestamp: moment().format(),
		};
	}
}

/*
  HTTP Error Handler
*/

const HttpErrorHandler = (httpError: HttpError, res: Response) => {
	const { data, metadata } = httpError;

	res.status(metadata.status).send({ data, metadata });
};

export { HttpError, HttpErrorHandler };

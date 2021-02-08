/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-07 17:20:48
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-07 17:21:10
 * @Description: Functions for all misc routes
 */

import { NextFunction, Request, Response } from 'express';

// Error route
const error = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	res.render('error');
};
export { error };

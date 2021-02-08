/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 19:15:14
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-04 01:07:51
 * @Description: Router for all sharing related routes
 */
import { Router } from 'express';
import { home, watch } from '../controllers';

const shareRouter: Router = Router();

// @desc	Home Route
// @route	GET /
shareRouter.get('/', home);

// @desc	Watch Route
// @route	GET /watch
shareRouter.get('/watch', watch);

export { shareRouter };

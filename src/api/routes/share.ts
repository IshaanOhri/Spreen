/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 19:15:14
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 19:15:41
 * @Description:
 */
import { Router } from 'express';
import { home } from '../controllers';

const shareRouter: Router = Router();

// @desc	Home Route
// @route	GET /
shareRouter.get('/', home);

export { shareRouter };

/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:23:55
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:23:55
 * @Description: Contains all miscellaneous routes
 */

import { Router } from 'express';
import { health, home } from '../controllers';

const miscRouter: Router = Router();

// @desc	Home Route
// @route	GET /
miscRouter.get('/', home);

// @desc	Health Route
// @route	GET /health
miscRouter.get('/health', health);

export { miscRouter };

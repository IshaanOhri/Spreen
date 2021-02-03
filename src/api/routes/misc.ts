/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:23:55
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 19:15:58
 * @Description: Contains all miscellaneous routes
 */

import { Router } from 'express';
import { health } from '../controllers';

const miscRouter: Router = Router();

// @desc	Health Route
// @route	GET /health
miscRouter.get('/health', health);

export { miscRouter };

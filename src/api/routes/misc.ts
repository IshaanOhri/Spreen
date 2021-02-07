/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-07 17:19:58
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-07 17:21:43
 * @Description:
 */

import { Router } from 'express';
import { error } from '../controllers';

const miscRouter: Router = Router();

// @desc	Error Route
// @route	GET *
miscRouter.get('*', error);

export { miscRouter };

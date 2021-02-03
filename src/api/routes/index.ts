/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:16:10
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:23:44
 * @Description: Indexing file for all Routes
 */

import { Router } from 'express';
import { miscRouter } from './misc';

const router: Router = Router();

router.use(miscRouter);

export { router };

/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:16:10
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 19:16:11
 * @Description: Indexing file for all Routes
 */

import { Router } from 'express';
import { miscRouter } from './misc';
import { shareRouter } from './share';

const router: Router = Router();

router.use(miscRouter);
router.use(shareRouter);

export { router };

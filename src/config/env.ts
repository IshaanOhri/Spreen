/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:21:23
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:21:23
 * @Description: File for exporting all environment variables
 */

export const NODE_ENV: string = String(process.env.NODE_ENV);
export const PORT: number = Number(process.env.PORT);
export const HOST: string = String(process.env.HOST);

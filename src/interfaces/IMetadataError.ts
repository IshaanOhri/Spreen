/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:25:48
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 21:15:24
 * @Description: Definition for the MetadataError interface used in HTTP Error
 */

export interface IMetadataError {
	success: boolean;
	status: number;
	error: string;
	timestamp: string;
}

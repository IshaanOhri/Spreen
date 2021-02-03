/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:26:03
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-02-03 14:26:03
 * @Description: Definition for the Metadata interface used in HTTP Response
 */

export interface IMetadata {
	success: boolean;
	status: number;
	message: string;
	timestamp: string;
}

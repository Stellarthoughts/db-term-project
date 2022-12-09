import { Response } from "express"

export const respondFailure = (
	error: string,
	res: Response
) => {
	res.status(404).json({
		message: "failure",
		error: error
	})
}

export const respondSuccess = (
	result: unknown,
	res: Response
) => {
	res.status(200).json({
		message: "success",
		body: result
	})
}
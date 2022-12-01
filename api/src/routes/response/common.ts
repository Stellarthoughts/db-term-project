import { Response } from "express"

export const respondFailure = (
	error: string,
	res: Response
) => {
	res.json({
		message: "failure",
		error: error
	})
}

export const respondSuccess = (
	result: unknown,
	res: Response
) => {
	res.json({
		message: "success",
		body: result
	})
}
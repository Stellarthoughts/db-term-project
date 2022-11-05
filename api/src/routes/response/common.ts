import { Response } from "express"

export const respondFailure = (
	traceMessage: string,
	res: Response
) => {
	console.trace(traceMessage)
	res.json({
		message: "failure",
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
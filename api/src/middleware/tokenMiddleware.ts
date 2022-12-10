import jwt from "jsonwebtoken"
import { respondFailure } from "../routes/response/common"


const config = process.env

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyToken = (req: any, res: any, next: any) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"]
		|| req.headers["authorization"]

	if (!token) {
		respondFailure("A token is required for authentication", res)
		return false
	}

	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY)
		req.user = decoded
	} catch (err) {
		respondFailure("Invalid Token", res)
		return false
	}
	return next()
}

export default verifyToken
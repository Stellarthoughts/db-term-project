import jwt from "jsonwebtoken"
import { respondFailure } from "../routes/response/common"


const config = process.env

const verifyToken = (req: any, res: any, next: any) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"]
		|| req.headers["authorization"]

	console.log(token)
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
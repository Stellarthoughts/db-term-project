import express from "express"
import { respondFailure, respondSuccess } from "./response/common"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { CreateUser, FindUserByLogin } from "../prisma/db/user"

const router = express.Router()

router.post("/register", async (req, res) => {
	// Our register logic starts here
	try {
		const encryptedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await CreateUser(req.body.login, encryptedPassword)

		// Create token
		const token = jwt.sign(
			{ id: user.id, login: req.body.login },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);
		// save user token
		user.token = token;
		respondSuccess(user, res)

	} catch (err) {
		console.log(err)
		respondFailure(err, res)
	}
	// Our register logic ends here
});

router.post("/login", async (req, res) => {

	// Our login logic starts here
	try {
		// Validate if user exist in our database
		const user = await FindUserByLogin(req.body.login)

		if (user && (await bcrypt.compare(req.body.password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ id: user.id, login: req.body.login },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			// save user token
			user.token = token;
			respondSuccess(user, res)
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err)
		respondFailure(err, res)
	}
	// Our register logic ends here
});

export default router
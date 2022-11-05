// TODO User
// Create user with nested acess and progress
// Delete user
// Read user

import express from "express";
import { Response } from "express-serve-static-core";
import prisma from "../prisma/prisma"

const router = express.Router();

const selectUserSettings = {
	id: true,
	login: true,
	accessId: true,
	progressId: true,
}

const catchAndRespond = (
	traceMessage: string,
	res: Response
) => {
	console.trace(traceMessage)
	res.json({
		message: "failure",
	})
}

// Create
router.post('/', (req, res) => {
	prisma.user.create({
		data: {
			login: req.body.login as string,
			password: req.body.password as string,
			access: {
				create: {}
			},
			progress: {
				create: {}
			}
		},
	}).catch(() => catchAndRespond("POST ERROR: USER", res)).then()
})

// Read All
router.get('/', (req, res) => {
	prisma.user.findMany({
		select: selectUserSettings
	}).catch(() => catchAndRespond("GET ERROR: ALL USER", res))
		.then((dbres) => {
			res.json({
				message: "success",
				data: dbres,
			})
			console.log(dbres);
		})
})

// Read by ID
router.get('/:userid', (req, res) => {
	prisma.user.findUniqueOrThrow({
		where: {
			id: req.params['userid'] as unknown as number,
		},
		select: selectUserSettings
	}).catch(() => catchAndRespond("GET ERROR: ID USER", res))
		.then((dbres) => {
			res.json({
				message: "success",
				data: dbres,
			})
		})
})

// Update User
router.put('/', (req, res) => {
	prisma.user.create({
		data: {
			login: req.body.login as string,
			password: req.body.password as string,
			access: {
				create: {}
			},
			progress: {
				create: {}
			}
		},
	}).catch(() => catchAndRespond("POST ERROR: USER", res))
})

// Delete User By ID
router.delete('/', (req, res) => {
	return res.send('Received a DELETE HTTP method');
})

export default router;
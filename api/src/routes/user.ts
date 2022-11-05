// TODO User
// Create user with nested acess and progress
// Delete user
// Read user

import express from "express";
import prisma from "../prisma/prisma"
import { respondFailure, respondSuccess } from "./response/common"

const router = express.Router();

const selectUserSettings = {
	id: true,
	login: true,
	accessId: true,
	progressId: true,
}

// Create
router.post('/', (req, res) => {
	console.log(req.body)
	prisma.user.create({
		data: {
			login: req.body.login,
			password: req.body.password,
			access: {
				create: {}
			},
			progress: {
				create: {}
			}
		},
		select: selectUserSettings,
	})
		.catch((err) => respondFailure(err, res))
		.then((dbres) => respondSuccess(dbres, res))
})

// Read All
router.get('/', (req, res) => {
	prisma.user.findMany({
		select: selectUserSettings
	}).catch((err) => respondFailure(err, res))
		.then((dbres) => respondSuccess(dbres, res))
})

// Read by ID
router.get('/:userid', (req, res) => {
	prisma.user.findUniqueOrThrow({
		where: {
			id: parseInt(req.params.userid),
		},
		select: selectUserSettings
	}).catch((err) => respondFailure(err, res))
		.then((dbres) => respondSuccess(dbres, res))
})


// Update User
router.put('/:userid', (req, res) => {
	prisma.user.update({
		where: {
			id: parseInt(req.params.userid)
		},
		data: {
			login: req.body.login as string,
			password: req.body.password as string,
		},
		select: selectUserSettings
	})
		.catch((err) => respondFailure(err, res))
		.then((dbres) => respondSuccess(dbres, res))
})

// Delete User By ID
router.delete('/:userid', (req, res) => {
	prisma.user.delete({
		where: {
			id: parseInt(req.params.userid)
		},
		select: selectUserSettings
	})
		.catch((err) => respondFailure(err, res))
		.then((dbres) => respondSuccess(dbres, res))
})

export default router;
import express from "express";
import { CreateUser } from "src/prisma/db/user";
import prisma from "../prisma/prisma"
import { handlePrismaPromise } from "./response/common"

const router = express.Router();

const selectUserSettings = {
	id: true,
	login: true,
	accessId: true,
	progressId: true,
}

// Create
router.post('/', async (req, res) => {
})

// Read All
router.get('/', (req, res) => {
	const dbres = prisma.access.findMany({
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})

// Read by ID
router.get('/:userid', (req, res) => {
	const dbres = prisma.access.findUniqueOrThrow({
		where: {
			id: parseInt(req.params.userid),
		},
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})


// Update Access
router.put('/:userid', (req, res) => {
	const dbres = prisma.access.update({
		where: {
			id: parseInt(req.params.userid)
		},
		data: {
			login: req.body.login as string,
			password: req.body.password as string,
		},
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})

// Delete Access By ID
router.delete('/:userid', (req, res) => {
	const dbres = prisma.access.delete({
		where: {
			id: parseInt(req.params.userid)
		},
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})

export default router;
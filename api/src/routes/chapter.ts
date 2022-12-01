import express from "express";
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
	const dbres = prisma.chapter.create({
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
	handlePrismaPromise(dbres, res)
})

// Read All
router.get('/', (req, res) => {
	const dbres = prisma.chapter.findMany({
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})

// Read by ID
router.get('/:userid', (req, res) => {
	const dbres = prisma.chapter.findUniqueOrThrow({
		where: {
			id: parseInt(req.params.userid),
		},
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})


// Update Chapter
router.put('/:userid', (req, res) => {
	const dbres = prisma.chapter.update({
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

// Delete Chapter By ID
router.delete('/:userid', (req, res) => {
	const dbres = prisma.chapter.delete({
		where: {
			id: parseInt(req.params.userid)
		},
		select: selectUserSettings
	})
	handlePrismaPromise(dbres, res)
})

export default router;
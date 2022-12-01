import express from "express";
import prisma from "../prisma/prisma"
import { handlePrismaPromise } from "./response/common"

const router = express.Router();

const selectProgressSettings = {
	id: true,
	lastPageId: true,
}

// Read All
router.get('/', (req, res) => {
	const dbres = prisma.progress.findMany({
		select: selectProgressSettings
	})
	handlePrismaPromise(dbres, res)
})

// Read by ID
router.get('/:progressid', (req, res) => {
	const dbres = prisma.progress.findUniqueOrThrow({
		where: {
			id: parseInt(req.params.progressid),
		},
		select: selectProgressSettings
	})
	handlePrismaPromise(dbres, res)
})

// Update Progress
router.put('/:progressid', (req, res) => {
	const dbres = prisma.progress.update({
		where: {
			id: parseInt(req.params.progressid)
		},
		data: {
			lastPageId: parseInt(req.body.lastPageId),
		},
		select: selectProgressSettings
	})
	handlePrismaPromise(dbres, res)
})

// Delete progress By ID
router.delete('/:progressid', (req, res) => {
	const dbres = prisma.progress.delete({
		where: {
			id: parseInt(req.params.progressid)
		},
		select: selectProgressSettings
	})
	handlePrismaPromise(dbres, res)
})

export default router;
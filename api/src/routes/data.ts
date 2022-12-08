import express from "express"
import { CreateEntry, DeleteEntryByID, FindAllEntries, FindEntryByID, UpdateEntryByID } from "../prisma/db/entry"
import { respondFailure, respondSuccess } from "./response/common"

const router = express.Router()

// Create
router.get('/tree', async (req, res) => {
	try {
		const result = await CreateEntry(
			req.body.name
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

router.get('/pages', async (req, res) => {
	try {
		const result = await CreateEntry(
			req.body.name
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

router.get('/threads', async (req, res) => {
	try {
		const result = await CreateEntry(
			req.body.name
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router;
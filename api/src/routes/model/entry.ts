import express from "express"
import { CreateEntry, DeleteEntryByID, FindAllEntries, FindEntryByID, UpdateEntryByID } from "../../prisma/db/model/entry"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
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

// Read All
router.get('/', async (req, res) => {
	try {
		const result = await FindAllEntries()
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Read by ID
router.get('/:id', async (req, res) => {
	try {
		const result = await FindEntryByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Entry
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateEntryByID(
			parseInt(req.params.id),
			req.body.login,
			req.body.password
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete Entry By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteEntryByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
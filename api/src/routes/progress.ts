import express from "express"
import { CreateProgress, DeleteProgressByID, FindAllProgresses, FindProgressByID, UpdateProgressByID } from "../prisma/db/progress"
import { respondFailure, respondSuccess } from "./response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateProgress()
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
		const result = await FindAllProgresses()
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
		const result = await FindProgressByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Progress
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateProgressByID(
			parseInt(req.params.id),
			parseInt(req.body.lastPageId)
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete Progress By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteProgressByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
import express from "express"
import { CreateProgress, DeleteProgressById, FindAllProgresses, FindProgressById, UpdateProgressById } from "../../prisma/db/model/progress"
import { respondFailure, respondSuccess } from "../response/common"

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
		const result = await FindProgressById(parseInt(req.params.id))
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
		const result = await UpdateProgressById(
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
		const result = await DeleteProgressById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
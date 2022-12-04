import express from "express"
import { CreateChapter, DeleteChapterByID, FindAllChapters, FindChapterByID, UpdateChapterByID } from "../prisma/db/chapter"
import { respondFailure, respondSuccess } from "./response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateChapter(
			req.body.name,
			parseInt(req.body.entryId)
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
		const result = await FindAllChapters()
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
		const result = await FindChapterByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Chapter
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateChapterByID(
			parseInt(req.params.id),
			req.body.name,
			parseInt(req.body.entryId)
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete Chapter By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteChapterByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
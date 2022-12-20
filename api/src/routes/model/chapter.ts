import express from "express"
import { CreateChapter, DeleteChapterById, FindAllChapters, FindChapterById, UpdateChapterById } from "../../prisma/db/model/chapter"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateChapter(
			req.body.name,
			parseInt(req.body.entryId),
			req.body.personalPageId ? parseInt(req.body.personalPageId) : null,
			parseInt(req.body.order)
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
		const result = await FindChapterById(parseInt(req.params.id))
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
		const result = await UpdateChapterById(
			parseInt(req.params.id),
			req.body.name,
			parseInt(req.body.entryId),
			parseInt(req.body.personalPageId),
			parseInt(req.body.order)
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
		const result = await DeleteChapterById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
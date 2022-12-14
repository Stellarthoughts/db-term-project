import express from "express"
import { CreatePage, DeletePageById, FindAllPages, FindPageById, UpdatePageById } from "../../prisma/db/model/page"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreatePage(
			req.body.chapterId ? parseInt(req.body.chapterId) : null,
			req.body.order ? parseInt(req.body.order) : 0
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
		const result = await FindAllPages()
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
		const result = await FindPageById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Page
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdatePageById(
			parseInt(req.params.id),
			parseInt(req.body.chapterId),
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

// Delete Page By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeletePageById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
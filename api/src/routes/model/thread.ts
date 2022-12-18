import express from "express"
import { CreateThread, DeleteThreadById, FindAllThreads, FindThreadById, UpdateThreadById } from "../../prisma/db/model/thread"
import { respondFailure, respondSuccess } from "../response/common"
import parseThreadType from "../type/thread"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateThread(
			parseThreadType(req.body.type),
			req.body.content,
			parseInt(req.body.pageId),
			parseInt(req.body.order),
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
		const result = await FindAllThreads()
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
		const result = await FindThreadById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Thread
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateThreadById(
			parseInt(req.params.id),
			parseThreadType(req.body.type),
			req.body.content,
			parseInt(req.body.pageId)
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete Thread By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteThreadById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
import express from "express"
import { CreateThread, DeleteThreadByID, FindAllThreads, FindThreadByID, UpdateThreadByID } from "../../prisma/db/model/thread"
import { respondFailure, respondSuccess } from "../response/common"
import parseThreadType from "../type/thread"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateThread(
			parseThreadType(req.body.threadType),
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
		const result = await FindThreadByID(parseInt(req.params.id))
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
		const result = await UpdateThreadByID(
			parseInt(req.params.id),
			parseThreadType(req.body.threadType),
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
		const result = await DeleteThreadByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
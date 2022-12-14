import express from "express"
import { FindAllEntriesAndChapters, FindChaptersInEntry, FindPagesInChapter, FindThreadsInPage } from "../../prisma/db/compound/data"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Create
router.get('/tree', async (req, res) => {
	try {
		const result = await FindAllEntriesAndChapters()
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

router.get('/pages/:id', async (req, res) => {
	try {
		const result = await FindPagesInChapter(parseInt(req.params.id))
		respondSuccess(result.pages, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

router.get('/threads/:id', async (req, res) => {
	try {
		const result = await FindThreadsInPage(parseInt(req.params.id))
		respondSuccess(result.threads, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

router.get('/chapters/:id', async (req, res) => {
	try {
		const result = await FindChaptersInEntry(parseInt(req.params.id))
		respondSuccess(result.chapters, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
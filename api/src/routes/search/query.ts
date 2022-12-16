import express from "express"
import { FindChaptersByName, FindEntriesByName } from "../../prisma/db/search/query"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Read by ID
router.get('/:query', async (req, res) => {
	try {
		const matchEntry = await FindEntriesByName(req.params.query)
		const matchChapter = await FindChaptersByName(req.params.query)
		respondSuccess({
			entries: matchEntry,
			chapters: matchChapter
		}, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
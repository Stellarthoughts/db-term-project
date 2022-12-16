import express from "express"
import { GetChapterCount, GetEntryCount, GetPageCount, GetThreadCount, GetUserCount } from "../../prisma/db/statistic/stats"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const entryCount = await GetEntryCount()
		const chapterCount = await GetChapterCount()
		const userCount = await GetUserCount()
		const threadCount = await GetThreadCount()
		const pageCount = await GetPageCount()
		respondSuccess({
			entryCount: entryCount,
			chapterCount: chapterCount,
			userCount: userCount,
			threadCount: threadCount,
			pageCount: pageCount
		}, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
import express from "express"
import { FindChaptersInEntry, FindPagesInChapter, FindThreadsInPage } from "../../prisma/db/compound/data"
import { FindChapterById } from "../../prisma/db/model/chapter"
import { FindEntryById } from "../../prisma/db/model/entry"
import { FindPageById } from "../../prisma/db/model/page"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

router.get('/generic/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		const page = await FindPageById(id)
		const threads = await FindThreadsInPage(id)
		const chapter = page.chapterId ? await FindChapterById(page.chapterId) : null
		const otherPages = page.chapterId ? await FindPagesInChapter(page.chapterId) : null
		const result = {
			pageData: page,
			threadsData: threads ? threads.threads : null,
			chapterData: chapter,
			otherPagesData: otherPages ? otherPages.pages : null,
		}
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// get chapter data
router.get('/chapter/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		const chapter = await FindChapterById(id)
		const pages = await FindPagesInChapter(id)
		const entry = chapter.entryId ? await FindEntryById(chapter.entryId) : null
		const otherChapters = chapter.entryId ? await FindChaptersInEntry(chapter.entryId) : null
		const personalPage = chapter.personalPageId ? await FindPageById(chapter.personalPageId) : null
		const personalPageThreads = chapter.personalPageId ? await FindThreadsInPage(chapter.personalPageId) : null
		const result = {
			chapterData: chapter,
			pagesData: pages ? pages.pages : null,
			entryData: entry,
			otherChaptersData: otherChapters ? otherChapters.chapters : null,
			personalPageData: personalPage,
			personalPageThreadsData: personalPageThreads ? personalPageThreads.threads : null,
		}
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
})

// get entry data
router.get('/entry/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		const entry = await FindEntryById(id)
		const chapters = await FindChaptersInEntry(id)
		const personalPage = entry.personalPageId ? await FindPageById(entry.personalPageId) : null
		const personalPageThreads = entry.personalPageId ? await FindThreadsInPage(entry.personalPageId) : null
		const result = {
			entryData: entry,
			chaptersData: chapters ? chapters.chapters : null,
			personalPageData: personalPage,
			personalPageThreadsData: personalPageThreads ? personalPageThreads.threads : null,
		}
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
})

export default router
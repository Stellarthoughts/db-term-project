import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"
import { ChapterPageData, chapterPageDataNull, GetChapterPageData } from "../../request/compound/pageData"
import { PutChapterById } from "../../request/model/chapter"
import paths from "../../router/paths"
import { Page, User } from "../../types/dbtypes"
import DeleteChapterDialog from "../dialog/chapter/deleteChapter"
import CreatePageDialog from "../dialog/page/createPage"
import CreatePersonalPage from "../dialog/page/createPersonalPage"
import CreateThreadDialog from "../dialog/thread/createThread"
import ThreadContainer from "./components/thread/threadContainer"
interface Props {
	updateTree: () => void
}

export async function fetchChapterPage(user: User | null, id: number) {
	if (!user)
		return chapterPageDataNull
	try {
		const data = await GetChapterPageData(user.token, id)
		return data
	}
	catch (e) {
		console.log(e)
		return chapterPageDataNull
	}
}

function ChapterPage({ updateTree }: Props) {
	const data = useLoaderData()
	const location = useLocation()
	const user = useAppSelector(state => state.user.user)
	const navigate = useNavigate()

	const { personalPageData, personalPageThreadsData, chapterData, pagesData, otherChaptersData, entryData } = data as ChapterPageData

	const [personalPage, setPersonalPage] = useState(personalPageData)
	const [personalPageThreads, setPersonalPageThreads] = useState(personalPageThreadsData)
	const [chapter, setChapter] = useState(chapterData)
	const [pages, setPages] = useState(pagesData)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [otherChapters, setOtherChapters] = useState(otherChaptersData)
	const [entry, setEntry] = useState(entryData)
	const [page, setPage] = useState(0)

	const [deleteChapterDialogOpen, setDeleteChapterDialogOpen] = useState(false)
	const [createPageDialogOpen, createAddPageDialogOpen] = useState(false)
	const [createPersonalPageDialogOpen, setCreatePersonalPageDialogOpen] = useState(false)
	const [createThreadInPersonalPageDialogOpen, setCreateThreadInPersonalPageDialogOpen] = useState(false)

	useEffect(() => {
		setPersonalPage(personalPageData)
		setPersonalPageThreads(personalPageThreadsData)
		setChapter(chapterData)
		setPages(pagesData)
		setOtherChapters(otherChaptersData)
		setEntry(entryData)
	}, [location])

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		if (value == page && pages && pages.at(value - 1)) {
			navigate(`${paths.page.absolutePath}/${pages[value - 1].id}`)
		}
	};

	const updateChapterPage = async () => {
		if (!chapter)
			return
		const data = await fetchChapterPage(user, chapter.id)
		if (!data)
			return
		setPersonalPage(data.personalPageData)
		setPersonalPageThreads(data.personalPageThreadsData)
		setChapter(data.chapterData)
		setPages(data.pagesData)
		setOtherChapters(data.otherChaptersData)
		setEntry(data.entryData)
	}

	const updateOnCreatePersonalPage = async (page: Page) => {
		try {
			if (!chapter || !user)
				return
			chapter.personalPageId = page.id
			await PutChapterById(user.token, chapter)
			updateChapterPage()
		}
		catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			{
				chapter ?
					<DeleteChapterDialog
						open={deleteChapterDialogOpen}
						setOpen={setDeleteChapterDialogOpen}
						callBack={updateTree}
						defaultChapterId={chapter.id}
					/> : <></>
			}
			{
				chapter ?
					<CreatePageDialog
						open={createPageDialogOpen}
						setOpen={createAddPageDialogOpen}
						callBack={updateChapterPage}
						defaultChapterId={chapter.id}
					/> : <></>
			}
			{
				chapter ? <CreatePersonalPage
					open={createPersonalPageDialogOpen}
					setOpen={setCreatePersonalPageDialogOpen}
					callBack={updateOnCreatePersonalPage}
				/> : <></>
			}
			{
				personalPage ? <CreateThreadDialog
					open={createThreadInPersonalPageDialogOpen}
					setOpen={setCreateThreadInPersonalPageDialogOpen}
					callBack={updateChapterPage}
					defaultPageId={personalPage.id}
				/> : <></>
			}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{
					chapter ?
						<Button onClick={() => setDeleteChapterDialogOpen(true)}>Удалить главу</Button>
						: <></>
				}
				{
					chapter ?
						<>
							<Typography component="h1" variant="h5">
								{chapter.name}
							</Typography>
							<Typography component="h5">
								{`ID: ${chapter.id}`}
							</Typography>
						</>
						: <></>
				}
				{
					entry ?
						<>
							<Typography>
								{"Книга: "}
								<Link to={`${paths.entry.absolutePath}/${entry.id}`}>
									{entry.name}
								</Link>
							</Typography>
						</> :
						<></>
				}
				{
					pages ?
						<>
							<Typography>
								Страницы главы:
							</Typography>
							<Pagination count={pages.length} page={page} onChange={handleChangePage} color="primary" />
							<Button onClick={() => createAddPageDialogOpen(true)}>Добавить страницу</Button>
						</>
						:
						<>
							<Typography>
								Похоже, в этой главе пока нет страниц!
							</Typography>
						</>
				}
				{
					personalPage ?
						<>
							{
								personalPageThreads ?
									<>
										<ThreadContainer threads={personalPageThreads} updatePage={updateChapterPage} />
									</>
									:
									<>
										<Typography>
											Похоже, у собственной страницы главы пока нет содержимого!
										</Typography>
									</>
							}
							<Button onClick={() => setCreateThreadInPersonalPageDialogOpen(true)}>
								Добавить тред
							</Button>
						</>
						:
						<>
							<Typography>
								Похоже, у этой главы пока нет собственной страницы!
							</Typography>
							<Button onClick={() => setCreatePersonalPageDialogOpen(true)}>
								Добавить собственную страницу
							</Button>
						</>
				}
			</Box></>
	)
}

export default ChapterPage

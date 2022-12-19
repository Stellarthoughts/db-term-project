import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { ChapterPageData, chapterPageDataNull, GetChapterPageData } from "../../../request/compound/pageData"
import { PutChapterById } from "../../../request/model/chapter"
import paths from "../../../router/paths"
import { Page, User } from "../../../types/dbtypes"
import DeleteChapterDialog from "../../dialog/chapter/deleteChapter"
import UpdateChapterDialog from "../../dialog/chapter/updateChapter"
import CreatePageDialog from "../../dialog/page/createPage"
import PersonalPage from "./personalPage/personalPage"
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
	const [updateChaterDialogOpen, setUpdateChaterDialogOpen] = useState(false)
	const [createPageDialogOpen, createAddPageDialogOpen] = useState(false)

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
				chapter ?
					<UpdateChapterDialog
						open={updateChaterDialogOpen}
						setOpen={setUpdateChaterDialogOpen}
						callBack={updateChapterPage}
						defaultChapter={chapter}
					/>
					: <></>
			}
			<Box>
				<Grid container>
					<Grid item container xs={4} justifyContent="flex-start">
						{
							chapter && entry ?
								<Button onClick={() => setUpdateChaterDialogOpen(true)}>Редактировать главу</Button>
								: <></>
						}
					</Grid>
					<Grid item container xs={4} justifyContent="center">
						{
							chapter ?
								<Typography variant="h4">
									{chapter.name}
								</Typography>
								: <></>
						}
					</Grid>
					<Grid container item xs={4} justifyContent="flex-end">
						{
							chapter ?
								<Button onClick={() => setDeleteChapterDialogOpen(true)}>Удалить главу</Button>
								: <></>
						}
					</Grid>
					<Grid container item xs={12} justifyContent="center">
						{
							chapter && entry ?
								<Stack alignItems="center">
									<Typography>
										{`ID: ${chapter.id}`}
									</Typography>
									<Typography>
										{"В книге: "}
										<Link to={`${paths.entry.absolutePath}/${entry.id}`}>
											{entry.name}
										</Link>
									</Typography>
								</Stack> :
								<></>
						}
					</Grid>
				</Grid>
				<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
				{
					pages ?
						<Box>
							<Stack sx={{ alignItems: "center" }} justifyContent="center" spacing={1}>
								<Button onClick={() => createAddPageDialogOpen(true)}>Добавить страницу</Button>
								<Typography>
									Страницы главы:
								</Typography>
								<Pagination count={pages.length} page={page} onChange={handleChangePage} color="primary" />
							</Stack>
						</Box>
						:
						<>
							<Typography>
								Похоже, в этой главе пока нет страниц!
							</Typography>
						</>
				}
				<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
				<PersonalPage
					entity={chapter}
					personalPage={personalPage}
					personalPageThreads={personalPageThreads}
					updateOnCreatePersonalPage={updateOnCreatePersonalPage}
					updateParentPage={updateChapterPage}
				/>
			</Box></>
	)
}

export default ChapterPage

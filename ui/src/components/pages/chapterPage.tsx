import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation } from "react-router-dom"
import { ChapterPageData } from "../../request/compound/pageData"
import DeleteChapterDialog from "../dialog/chapter/deleteChapter"
import ThreadContainer from "./components/thread/threadContainer"

interface Props {
	fetchTree: () => void
}

function ChapterPage({ fetchTree }: Props) {
	const data = useLoaderData()
	const location = useLocation()

	const { personalPageData, personalPageThreadsData, chapterData, pagesData, otherChaptersData, entryData } = data as ChapterPageData

	const [personalPage, setPersonalPage] = useState(personalPageData)
	const [personalPageThreads, setPersonalPageThreads] = useState(personalPageThreadsData)
	const [chapter, setChapter] = useState(chapterData)
	const [pages, setPages] = useState(pagesData)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [otherChapters, setOtherChapters] = useState(otherChaptersData)
	const [entry, setEntry] = useState(entryData)

	const [deleteChapterDialogOpen, setDeleteChapterDialogOpen] = useState(false)

	useEffect(() => {
		setPersonalPage(personalPageData)
		setPersonalPageThreads(personalPageThreadsData)
		setChapter(chapterData)
		setPages(pagesData)
		setOtherChapters(otherChaptersData)
		setEntry(entryData)
	}, [location])

	return (
		<>
			{
				chapter ?
					<DeleteChapterDialog
						open={deleteChapterDialogOpen}
						setOpen={setDeleteChapterDialogOpen}
						callBack={fetchTree}
						defaultChapterId={chapter.id
						}
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
				{chapter ?
					<>
						<Typography component="h1" variant="h5">
							{chapter.name}
						</Typography>
					</>
					: <></>}
				{entry ?
					<>
						<Typography>
							{"Книга: "}
							<Link to={`/entry/${entry.id}`}>
								{entry.name}
							</Link>
						</Typography>
					</> :
					<></>}
				{pages ?
					<>
						<Typography>
							Страницы главы:
						</Typography>
						<Pagination count={pages.length} page={0} color="primary" />
					</>
					:
					<>
						<Typography>
							Похоже, в этой главе пока нет страниц!
						</Typography>
					</>}
				{personalPage ?
					<>
						{personalPageThreads ?
							<>
								<ThreadContainer threads={personalPageThreads} />
							</>
							:
							<>
								<Typography>
									Похоже, у собственной страницы главы пока нет содержимого!
								</Typography>
							</>}

					</>
					:
					<>
						<Typography>
							Похоже, у этой главы пока нет собственной страницы!
						</Typography>
					</>}
			</Box></>
	)
}

export default ChapterPage

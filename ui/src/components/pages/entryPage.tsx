import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useLoaderData, useLocation } from "react-router-dom"
import { EntryPageData } from "../../request/compound/pageData"
import ThreadContainer from "./components/thread/threadContainer"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import DeleteEntryDialog from "../dialog/entry/deleteEntry"
import Button from "@mui/material/Button"
import CreateChapterDialog from "../dialog/chapter/createChapter"

interface Props {
	fetchTree: () => void
}

function EntryPage({ fetchTree }: Props) {
	const data = useLoaderData()
	const location = useLocation()

	const { personalPageData, personalPageThreadsData, entryData, chaptersData } = data as EntryPageData

	const [personalPage, setPersonalPage] = useState(personalPageData)
	const [personalPageThreads, setPersonalPageThreads] = useState(personalPageThreadsData)
	const [entry, setEntry] = useState(entryData)
	const [chapters, setChapters] = useState(chaptersData)

	useEffect(() => {
		setPersonalPage(personalPageData)
		setPersonalPageThreads(personalPageThreadsData)
		setEntry(entryData)
		setChapters(chaptersData)
	}, [location])

	const [deleteEntryDialogOpen, setDeleteEntryDialogOpen] = useState(false)
	const [addChapterDialogOpen, setAddChapterDialogOpen] = useState(false)

	return (
		<>
			{
				entry ? <DeleteEntryDialog
					open={deleteEntryDialogOpen}
					setOpen={setDeleteEntryDialogOpen}
					callBack={fetchTree}
					defaultId={entry.id}
				/> : <></>
			}
			{
				entry ? <CreateChapterDialog
					open={addChapterDialogOpen}
					setOpen={setAddChapterDialogOpen}
					callBack={fetchTree}
					defaultEntryId={entry.id}
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
					entry ? <Button onClick={() => setDeleteEntryDialogOpen(true)}>Удалить книгу</Button> : <></>
				}
				{entry ?
					<>
						<Typography component="h1" variant="h5">
							{entry.name}
						</Typography>
						<Typography component="h5">
							{`ID: ${entry.id}`}
						</Typography>
					</>
					:
					<>
						<Typography>
							Похоже, этой книги не существует!
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
									Похоже, у собственной страницы книги пока нет содержимого!
								</Typography>
							</>}

					</>
					:
					<>
						<Typography>
							Похоже, у этой книги пока нет собственной страницы!
						</Typography>
					</>}
				{entry && chapters ?
					<>
						<Typography>
							Главы:
						</Typography>
						{chapters.map((chapterData) => {
							return (
								<Link key={chapterData.id} to={`/chapter/${chapterData.id}`}>
									{chapterData.name}
								</Link>
							)
						})}
						<Button onClick={() => setAddChapterDialogOpen(true)}>Добавить главу</Button>
					</>
					:
					<>
						<Typography>
							Похоже, в этой книге пока нет глав!
						</Typography>
					</>}
				{entry ?
					<>
					</> :
					<>
					</>}
			</Box></>
	)
}

export default EntryPage

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { EntryPageData, entryPageDataNull, GetEntryPageData } from "../../../request/compound/pageData"
import { PutEntryById } from "../../../request/model/entry"
import paths from "../../../router/paths"
import { Page, User } from "../../../types/dbtypes"
import CreateChapterDialog from "../../dialog/chapter/createChapter"
import DeleteEntryDialog from "../../dialog/entry/deleteEntry"
import UpdateEntryDialog from "../../dialog/entry/updateEntry"
import PersonalPage from "./personalPage/personalPage"

interface Props {
	updateTree: () => void
}

export async function fetchEntryPage(user: User | null, id: number) {
	if (!user)
		return entryPageDataNull
	try {
		const data = await GetEntryPageData(user.token, id)
		return data
	}
	catch (e) {
		console.log(e)
		return entryPageDataNull
	}
}

function EntryPage({ updateTree }: Props) {
	const data = useLoaderData()
	const location = useLocation()
	const user = useAppSelector(state => state.user.user)

	// Get from loader
	const { personalPageData, personalPageThreadsData, entryData, chaptersData } = data as EntryPageData

	// Set state
	const [personalPage, setPersonalPage] = useState(personalPageData)
	const [personalPageThreads, setPersonalPageThreads] = useState(personalPageThreadsData)
	const [entry, setEntry] = useState(entryData)
	const [chapters, setChapters] = useState(chaptersData)
	// Dialogs
	const [deleteEntryDialogOpen, setDeleteEntryDialogOpen] = useState(false)
	const [updateEntryDialogOpen, setUpdateEntryDialogOpen] = useState(false)
	const [createChapterDialogOpen, setCreateChapterDialogOpen] = useState(false)

	useEffect(() => {
		setPersonalPage(personalPageData)
		setPersonalPageThreads(personalPageThreadsData)
		setEntry(entryData)
		setChapters(chaptersData)
	}, [location])

	const updateEntryPage = async () => {
		if (!entry)
			return
		const data = await fetchEntryPage(user, entry.id)
		if (!data)
			return
		setPersonalPage(data.personalPageData)
		setPersonalPageThreads(data.personalPageThreadsData)
		setEntry(data.entryData)
		setChapters(data.chaptersData)
	}

	const updateOnCreatePersonalPage = async (page: Page) => {
		try {
			if (!entry || !user)
				return
			entry.personalPageId = page.id
			await PutEntryById(user.token, entry)
			updateEntryPage()
		}
		catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			{
				entry ? <DeleteEntryDialog
					open={deleteEntryDialogOpen}
					setOpen={setDeleteEntryDialogOpen}
					callBack={updateTree}
					defaultEntryId={entry.id}
				/> : <></>
			}
			{
				entry ? <CreateChapterDialog
					open={createChapterDialogOpen}
					setOpen={setCreateChapterDialogOpen}
					callBack={updateTree}
					defaultEntryId={entry.id}
				/> : <></>
			}
			{
				entry ? <UpdateEntryDialog
					open={updateEntryDialogOpen}
					setOpen={setUpdateEntryDialogOpen}
					callBack={updateEntryPage}
					defaultEntry={entry}
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
					entry ? <Button onClick={() => setUpdateEntryDialogOpen(true)}>Редактировать книгу</Button> : <></>
				}
				{
					entry ? <Button onClick={() => setDeleteEntryDialogOpen(true)}>Удалить книгу</Button> : <></>
				}
				{
					entry ?
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
						</>
				}
				{
					entry && chapters ?
						<>
							<Typography>
								Главы:
							</Typography>
							{chapters.map((chapter) => {
								return (
									<Link key={chapter.id} to={`${paths.chapter.absolutePath}/${chapter.id}`}>
										{chapter.name}
									</Link>
								)
							})}
							<Button onClick={() => setCreateChapterDialogOpen(true)}>Добавить главу</Button>
						</>
						:
						<>
							<Typography>
								Похоже, в этой книге пока нет глав!
							</Typography>
						</>
				}
				<PersonalPage
					entity={entry}
					personalPage={personalPage}
					personalPageThreads={personalPageThreads}
					updateOnCreatePersonalPage={updateOnCreatePersonalPage}
					updateParentPage={updateEntryPage}
				/>
			</Box></>
	)
}

export default EntryPage

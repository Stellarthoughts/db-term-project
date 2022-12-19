import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
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
			<Box>
				<Grid container>
					<Grid item container xs={4} justifyContent="flex-start">
						{
							entry ? <Button onClick={() => setUpdateEntryDialogOpen(true)}>Редактировать книгу</Button> : <></>
						}
					</Grid>
					<Grid item xs={4}>
						{
							entry ?
								<>
									<Stack
										sx={{ alignItems: 'center' }}
									>
										<Typography variant="h4">
											{entry.name}
										</Typography>
										<Typography>
											{`ID: ${entry.id}`}
										</Typography>
									</Stack>
								</>
								:
								<>
									<Typography>
										Похоже, этой книги не существует!
									</Typography>
								</>
						}
					</Grid>
					<Grid container item xs={4} justifyContent="flex-end">
						{
							entry ? <Button onClick={() => setDeleteEntryDialogOpen(true)}>Удалить книгу</Button> : <></>
						}
					</Grid>
				</Grid>
				<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
				{
					entry && chapters ?
						<Box sx={{ paddingLeft: "7px" }}>
							<Stack direction="row" spacing={2}>
								<Typography variant="h5">
									Главы
								</Typography>
								<Button onClick={() => setCreateChapterDialogOpen(true)}>Добавить главу</Button>
							</Stack>
							<Grid container direction="row" spacing={1}>
								{
									chapters.map((chapter) => {
										return (
											<Grid key={chapter.id} item>
												<Link to={`${paths.chapter.absolutePath}/${chapter.id}`}>
													{chapter.name}
												</Link>
											</Grid>
										)
									})
								}
							</Grid>
						</Box>
						:
						<></>
				}
				<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
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

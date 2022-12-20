import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useAppSelector } from "../../../../hooks/hooks"
import { Chapter, Entry, Page, Thread } from "../../../../types/dbtypes"
import CreatePersonalPage from "../../../dialog/page/createPersonalPage"
import DeletePageDialog from "../../../dialog/page/deletePage"
import CreateThreadDialog from "../../../dialog/thread/createThread"
import ThreadContainer from "../../../thread/threadContainer"

interface Props {
	updateOnCreatePersonalPage: (page: Page) => void
	updateParentPage: () => void
	entity: Entry | Chapter | null
	personalPage: Page | null
	personalPageThreads: Thread[] | null
}

function PersonalPage({
	updateOnCreatePersonalPage,
	updateParentPage,
	entity,
	personalPage,
	personalPageThreads }: Props) {

	const user = useAppSelector(state => state.user.user)
	const [createPersonalPageDialogOpen, setCreatePersonalPageDialogOpen] = useState(false)
	const [deletePersonalPageDialogOpen, setDeletePersonalPageDialogOpen] = useState(false)
	const [createThreadInPersonalPageDialogOpen, setCreateThreadInPersonalPageDialogOpen] = useState(false)

	return (
		<>
			{
				entity ? <CreatePersonalPage
					open={createPersonalPageDialogOpen}
					setOpen={setCreatePersonalPageDialogOpen}
					callBack={updateOnCreatePersonalPage}
				/> : <></>
			}
			{
				personalPage ? <CreateThreadDialog
					open={createThreadInPersonalPageDialogOpen}
					setOpen={setCreateThreadInPersonalPageDialogOpen}
					callBack={updateParentPage}
					defaultPageId={personalPage.id}
					defaultOrder={
						personalPageThreads && personalPageThreads.length > 0 ?
							Math.max(...personalPageThreads.map(x => x.order)) + 1
							: 0
					}
				/> : <></>
			}
			{
				personalPage ? <DeletePageDialog
					open={deletePersonalPageDialogOpen}
					setOpen={setDeletePersonalPageDialogOpen}
					callBack={updateParentPage}
					defaultPageId={personalPage.id}
				/> : <></>
			}
			{
				personalPage ?
					<>
						<Stack direction="row" justifyContent="space-between">
							{
								user?.access?.canCreate ?
									<Button onClick={() => setCreateThreadInPersonalPageDialogOpen(true)}>
										Добавить тред в персональную страницу
									</Button>
									: <></>
							}
							{
								user?.access?.canDelete ?
									<Button onClick={() => setDeletePersonalPageDialogOpen(true)}>
										Удалить персональную страницу
									</Button>
									: <></>
							}
						</Stack>
						{
							personalPageThreads ?
								<Box sx={{ paddingLeft: "10px" }}>
									<ThreadContainer threads={personalPageThreads} updatePage={updateParentPage} />
								</Box>
								:
								<></>
						}
					</>
					:
					entity && user?.access?.canCreate ?
						<Button onClick={() => setCreatePersonalPageDialogOpen(true)}>
							Добавить персональную страницу
						</Button> : <></>
			}
		</>
	)
}

export default PersonalPage
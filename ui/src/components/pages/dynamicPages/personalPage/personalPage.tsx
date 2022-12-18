import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useState } from "react"
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
						{
							personalPageThreads ?
								<>
									<ThreadContainer threads={personalPageThreads} updatePage={updateParentPage} />
								</>
								:
								<>
									<Typography>
										Похоже, у собственной страницы пока нет содержимого!
									</Typography>
								</>
						}
						<Button onClick={() => setCreateThreadInPersonalPageDialogOpen(true)}>
							Добавить тред в собственную страницу
						</Button>
						<Button onClick={() => setDeletePersonalPageDialogOpen(true)}>
							Удалить собственную страницу
						</Button>
					</>
					:
					<>
						<Typography>
							Похоже, собственной страницы пока нет!
						</Typography>
						<Button onClick={() => setCreatePersonalPageDialogOpen(true)}>
							Добавить собственную страницу
						</Button>
					</>
			}
		</>
	)
}

export default PersonalPage
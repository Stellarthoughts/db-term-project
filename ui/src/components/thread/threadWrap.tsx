import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useState } from "react"
import { Thread } from "../../types/dbtypes";
import DeleteThreadDialog from "../dialog/thread/deleteThread";
import UpdateThreadDialog from "../dialog/thread/updateThread";

interface Props {
	component: JSX.Element
	thread: Thread
	updatePage?: () => void
}

function ThreadWrap({ thread, updatePage, component }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

	return (
		<Box>
			{
				thread && updatePage ?
					<>
						<DeleteThreadDialog
							open={deleteDialogOpen}
							setOpen={setDeleteDialogOpen}
							callBack={updatePage}
							defaultThreadId={thread.id} />
						<UpdateThreadDialog
							open={updateDialogOpen}
							setOpen={setUpdateDialogOpen}
							callBack={updatePage}
							defaultThread={thread}
						/>
					</> : <></>
			}
			{component}
			{
				thread && updatePage ?
					<>
						<Button onClick={() => setUpdateDialogOpen(true)}>
							Редактировать тред
						</Button>
						<Button onClick={() => setDeleteDialogOpen(true)}>
							Удалить тред
						</Button>
					</>
					: <></>
			}
		</Box>
	)
}

export default ThreadWrap

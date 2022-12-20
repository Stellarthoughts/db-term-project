import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useState } from "react"
import { useAppSelector } from "../../hooks/hooks";
import { Thread } from "../../types/dbtypes";
import DeleteThreadDialog from "../dialog/thread/deleteThread";
import UpdateThreadDialog from "../dialog/thread/updateThread";

interface Props {
	component: JSX.Element
	thread: Thread
	updatePage?: () => void
}

function ThreadWrap({ thread, updatePage, component }: Props) {
	const user = useAppSelector(state => state.user.user)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

	return (
		<Box sx={{ width: "100%", boxShadow: 3 }}>
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
			<Box sx={{ padding: "10px" }}>
				{component}
			</Box>
			{
				thread && updatePage ?
					<>
						{
							user?.access?.canEdit ? <Button onClick={() => setUpdateDialogOpen(true)}>
								Редактировать тред
							</Button> : <></>
						}
						{
							user?.access?.canDelete ? <Button onClick={() => setDeleteDialogOpen(true)}>
								Удалить тред
							</Button> : <></>
						}
					</>
					: <></>
			}
		</Box>
	)
}

export default ThreadWrap

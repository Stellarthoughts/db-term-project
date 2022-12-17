import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useState } from "react"
import { Player } from "video-react"
import { Thread } from "../../../../../types/dbtypes"
import DeleteThreadDialog from "../../../../dialog/thread/deleteThread"
interface Props {
	thread: Thread
	updatePage?: () => void
}

function VideoThread({ thread, updatePage }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	return (
		<Box>
			{
				updatePage ?
					<DeleteThreadDialog
						open={deleteDialogOpen}
						setOpen={setDeleteDialogOpen}
						callBack={updatePage}
						defaultThreadId={thread.id}
					/> : <></>
			}
			<Player src={`/api/static/${thread.content}`} />
			{
				updatePage ?
					<Button onClick={() => setDeleteDialogOpen(true)}>
						Удалить нить
					</Button>
					: <></>
			}
		</Box>
	)
}

export default VideoThread

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useState } from "react"
import ReactAudioPlayer from 'react-audio-player';
import { Thread } from "../../../../../types/dbtypes";
import DeleteThreadDialog from "../../../../dialog/thread/deleteThread";

interface Props {
	thread: Thread
	updatePage?: () => void
}

function AudioThread({ thread, updatePage }: Props) {
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
			<ReactAudioPlayer
				src={`/api/static/${thread.content}`}
				controls
			/>
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

export default AudioThread

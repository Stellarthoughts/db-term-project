import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useState } from "react"
import { Thread } from "../../../../../types/dbtypes"
import DeleteThreadDialog from "../../../../dialog/thread/deleteThread"

interface Props {
	thread: Thread
	updatePage?: () => void
}

function ImageThread({ thread, updatePage }: Props) {
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
			<Box
				component="img"
				sx={{
					height: 233,
					width: 350,
					maxHeight: { xs: 233, md: 167 },
					maxWidth: { xs: 350, md: 250 },
				}}
				alt="Эта картинка не загрузилась"
				src={`/api/static/${thread.content}`}
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

export default ImageThread

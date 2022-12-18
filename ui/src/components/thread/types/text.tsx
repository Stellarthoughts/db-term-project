import Box from "@mui/material/Box"
import { Thread } from "../../../types/dbtypes"
import ThreadWrap from "../threadWrap"

interface Props {
	thread: Thread
	updatePage?: () => void
}

function TextThread({ thread, updatePage }: Props) {
	return (
		<ThreadWrap
			thread={thread}
			updatePage={updatePage}
			component={
				<Box>
					{thread.content}
				</Box>
			}
		/>

	)
}

export default TextThread

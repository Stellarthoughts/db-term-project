import Box from "@mui/material/Box"
import { Thread } from "../../../../../types/dbtypes"

function TextThread({ thread }: { thread: Thread }) {
	return (
		<Box>
			{thread.content}
		</Box>
	)
}

export default TextThread

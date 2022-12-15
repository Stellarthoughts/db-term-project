import { Thread } from "../../../../../types/dbtypes"
import Box from "@mui/material/Box"

function ImageThread({ thread }: { thread: Thread }) {
	return (
		<Box
			component="img"
			sx={{
				height: 233,
				width: 350,
				maxHeight: { xs: 233, md: 167 },
				maxWidth: { xs: 350, md: 250 },
			}}
			alt="The house from the offer."
			src={`/public/${thread.content}`}
		/>
	)
}

export default ImageThread

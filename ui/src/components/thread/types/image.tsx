import Box from "@mui/material/Box"
import { Thread } from "../../../types/dbtypes"
import ThreadWrap from "../threadWrap"

interface Props {
	thread: Thread
	updatePage?: () => void
}

function ImageThread({ thread, updatePage }: Props) {
	return (
		<ThreadWrap
			thread={thread}
			updatePage={updatePage}
			component={
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
			}
		/>
	)
}

export default ImageThread

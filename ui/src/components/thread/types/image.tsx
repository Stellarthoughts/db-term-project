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
					display="flex"
					justifyContent="center"
				>
					<Box
						component="img"
						sx={{
							maxHeight: { xs: 350, sm: 400, md: 500 },
							maxWidth: { xs: 400, sm: 400, md: 500 },
						}}
						alt="Эта картинка не загрузилась"
						src={`/api/static/${thread.content}`}
					/>
				</Box>
			}
		/>
	)
}

export default ImageThread

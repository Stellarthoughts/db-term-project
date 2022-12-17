import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Thread, ThreadType } from "../../../../types/dbtypes"
import AudioThread from "./generic/audio"
import ImageThread from "./generic/image"
import TextThread from "./generic/text"
import VideoThread from "./generic/video"

interface Props {
	threads: Thread[]
	updatePage: () => void
}

function ThreadContainer({ threads, updatePage }: Props) {
	return (
		<Box>
			<Stack spacing={2}>
				{
					threads.map((thread) => {
						// switch throug all thread types and assign corresponding components in return
						switch (thread.type) {
							case ThreadType.TEXT:
								return <TextThread thread={thread} updatePage={updatePage} />
							case ThreadType.IMAGE:
								return <ImageThread thread={thread} updatePage={updatePage} />
							case ThreadType.AUDIO:
								return <AudioThread thread={thread} updatePage={updatePage} />
							case ThreadType.VIDEO:
								return <VideoThread thread={thread} updatePage={updatePage} />
						}
						return <></>
					}
					)
				}
			</Stack>
		</Box>
	)
}

export default ThreadContainer

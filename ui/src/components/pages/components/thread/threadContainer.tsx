import Box from "@mui/material/Box"
import { Thread, ThreadType } from "../../../../types/dbtypes"
import AudioThread from "./generic/audio"
import ImageThread from "./generic/image"
import TextThread from "./generic/text"
import VideoThread from "./generic/video"

function ThreadContainer({ threads }: { threads: Thread[] }) {
	return (
		<Box>
			{
				threads.map((thread) => {
					// switch throug all thread types and assign corresponding components in return
					switch (thread.type) {
						case ThreadType.TEXT:
							return <TextThread thread={thread} />
						case ThreadType.IMAGE:
							return <ImageThread thread={thread} />
						case ThreadType.AUDIO:
							return <AudioThread thread={thread} />
						case ThreadType.VIDEO:
							return <VideoThread thread={thread} />
					}
					return <></>
				}
				)
			}
		</Box>
	)
}

export default ThreadContainer

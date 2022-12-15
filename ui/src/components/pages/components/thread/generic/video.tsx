import { Player } from "video-react"
import { Thread } from "../../../../../types/dbtypes"

function VideoThread({ thread }: { thread: Thread }) {
	return (
		<>
			<Player src={`/api/static/${thread.content}`} />
		</>
	)
}

export default VideoThread

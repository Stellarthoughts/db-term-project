import ReactPlayer from "react-player"
import { Thread } from "../../../../../types/dbtypes"

function VideoThread({ thread }: { thread: Thread }) {
	return (
		<>
			<ReactPlayer url={`/api/static/${thread.content}`} />
		</>
	)
}

export default VideoThread

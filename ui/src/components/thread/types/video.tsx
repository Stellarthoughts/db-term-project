import { Player } from "video-react"
import { Thread } from "../../../types/dbtypes"
import ThreadWrap from "../threadWrap"

interface Props {
	thread: Thread
	updatePage?: () => void
}

function VideoThread({ thread, updatePage }: Props) {
	return (
		<ThreadWrap
			thread={thread}
			updatePage={updatePage}
			component={
				<Player src={`/api/static/${thread.content}`} />
			}
		/>
	)
}

export default VideoThread

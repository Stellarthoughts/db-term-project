import ReactAudioPlayer from 'react-audio-player';
import { Thread } from "../../../types/dbtypes";
import ThreadWrap from "../threadWrap";

interface Props {
	thread: Thread
	updatePage?: () => void
}

function AudioThread({ thread, updatePage }: Props) {
	return (
		<ThreadWrap
			thread={thread}
			updatePage={updatePage}
			component={
				<ReactAudioPlayer
					src={`/api/static/${thread.content}`}
					controls />
			}
		/>
	)
}

export default AudioThread

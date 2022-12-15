import { Thread } from "../../../../../types/dbtypes"
import ReactAudioPlayer from 'react-audio-player';

function AudioThread({ thread }: { thread: Thread }) {
	return (
		<>
			<ReactAudioPlayer
				src={`/api/static/${thread.content}`}
				controls
			/>
		</>
	)
}

export default AudioThread

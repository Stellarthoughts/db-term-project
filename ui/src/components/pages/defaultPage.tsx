import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ReactAudioPlayer from "react-audio-player"
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import { MoqThread, Thread } from "../../types/dbtypes";
import ThreadContainer from "./components/thread/threadContainer";

const MoqThreads: Thread[] = [
	MoqThread(
		"TEXT",
		"Добро пожаловать в WebBook! Этот сайт поможет вам разместить ваш контент в форме книги, в которую можно внести не только текст, но и картинки, аудио и видео."),
	MoqThread(
		"IMAGE",
		"book.png"
	),
	MoqThread(
		"TEXT",
		"Попробуйте проиграть следующие аудио и видео материалы:"
	),
	MoqThread(
		"VIDEO",
		"relax_video.mp4"
	),
	MoqThread(
		"VIDEO",
		"relax_video.mp4"
	),
]

function DefaultPage() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<ThreadContainer threads={MoqThreads} updatePage={() => undefined} />
		</Box>
	)
}

export default DefaultPage

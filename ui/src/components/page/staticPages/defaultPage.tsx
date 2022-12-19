import Box from "@mui/material/Box";
import { MoqThread, Thread } from "../../../types/dbtypes";
import ThreadContainer from "../../thread/threadContainer";

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
	)
]

function DefaultPage() {
	return (
		<Box>
			<ThreadContainer threads={MoqThreads} />
		</Box>
	)
}

export default DefaultPage

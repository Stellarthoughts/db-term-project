import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ReactAudioPlayer from "react-audio-player"
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";

function DefaultPage() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography component="h1" variant="h5">
				Добро пожаловать в WebBook! Здесь вы можете просмаривать и создавать веб-книги.
			</Typography>
			<ReactAudioPlayer
				src={`/api/static/bruh.mp3`}
				controls
			/>
			<Box
				component="img"
				sx={{
					height: 233,
					width: 350,
					maxHeight: { xs: 233, md: 167 },
					maxWidth: { xs: 350, md: 250 },
				}}
				alt="The house from the offer."
				src={`/api/static/image.jpg`}
			/>
			<Player
				playsInline
				src="/api/static/f.mov"
			/>
		</Box>
	)
}

export default DefaultPage

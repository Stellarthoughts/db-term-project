import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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
		</Box>
	)
}

export default DefaultPage

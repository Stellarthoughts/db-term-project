import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

function DefaultPage() {
	return (
		<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography component="h1" variant="h5">
				Hello!
			</Typography>
		</Box>
	)
}

export default DefaultPage

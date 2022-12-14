import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

function GenericPage() {
	return (
		<Box
			sx={{
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

export default GenericPage

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

function UploadPage() {
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
			<form action="/upload" method="POST" encType="multipart/form-data">
				<input type="file" name="image" />
				<button type="submit">Upload</button>
			</form>
		</Box>
	)
}

export default UploadPage

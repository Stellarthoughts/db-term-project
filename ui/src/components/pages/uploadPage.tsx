import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)

	const handleChange = (value: File | null) => {
		setFile(value)
	}

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
			<MuiFileInput value={file} onChange={handleChange} />
		</Box>
	)
}

export default UploadPage

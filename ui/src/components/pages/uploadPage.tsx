import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"
import axios from 'axios';
import Button from "@mui/material/Button"
import { UploadFile } from "../../request/resources/upload";

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)

	const handleChange = (value: File | null) => {
		setFile(value)
	}

	const handleOnClick = () => {
		if (file == null)
			return
		UploadFile(file)
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
			<Button onClick={handleOnClick} variant="contained">Upload4444</Button>
		</Box >
	)
}

export default UploadPage

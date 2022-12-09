import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"
import { GenRequest } from "../../request/general"
import axios from 'axios';
import Button from "@mui/material/Button"

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)

	const handleChange = (value: File | null) => {
		setFile(value)
		console.log(value)

	}

	const handleOnClick = (e: any) => {
		/* const configInit = {
			method: "POST",
			headers: {
				'Content-Type': 'multipart/form-data',
				'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImxvZ2luIjoibG9nMzJpMW4iLCJpYXQiOjE2NzA1NzU4OTYsImV4cCI6MTY3MDU4MzA5Nn0.QHFw2v1ny_vnkQvbARvDuyAEjDSQ5PPeAyohFTzwrkE'
			},
			files: file
		}
		const request = "/api/upload"
		GenRequest(request, configInit) */
		if (file == null)
			return

		const formData = new FormData();

		formData.append(
			"file",
			file as Blob,
			file.name
		)
		// Update the formData object
		axios.post("/api/upload", formData);
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
			<Button onClick={handleOnClick} variant="contained">Send</Button>
		</Box >
	)
}

export default UploadPage

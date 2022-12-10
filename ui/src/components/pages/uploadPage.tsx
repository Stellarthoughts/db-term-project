import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"
import Button from "@mui/material/Button"
import { UploadFile } from "../../request/resources/upload"
import { useAppSelector } from "../../hooks/hooks"

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const user = useAppSelector(state => state.user.user)

	const handleChange = (value: File | null) => {
		setFile(value)
	}

	const handleOnClick = () => {
		if (file == null || user == null)
			return
		UploadFile(file, user.token)
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
			<Button onClick={handleOnClick} variant="contained">Upload</Button>
		</Box >
	)
}

export default UploadPage

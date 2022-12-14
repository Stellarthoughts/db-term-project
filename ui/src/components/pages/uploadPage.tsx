import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"
import Button from "@mui/material/Button"
import { UploadFile } from "../../request/resources/upload"
import { useAppSelector } from "../../hooks/hooks"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { maxWidth } from "@mui/system"

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const [name, setName] = useState("")
	const user = useAppSelector(state => state.user.user)

	const handleChange = (value: File | null) => {
		setFile(value)
	}



	const handleOnClick = () => {
		if (file == null || user == null)
			return
		UploadFile(user.token, file, name)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography component="h1" variant="h5">
				Загрузка файлов на сервер
			</Typography>
			<Box component="form" noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id=""
					label="Имя файла"
					name="login"
					onChange={(e) => setName(e.target.value)}
				/>
				<Grid spacing={2} justifyContent="center" container>
					<Grid item xs={12}>
						<MuiFileInput value={file} onChange={handleChange} sx={{
							width: "100%"
						}} />
					</Grid>
					<Grid item>
						<Button onClick={handleOnClick} variant="contained">Upload</Button>
					</Grid>
				</Grid>

			</Box>
		</Box >
	)
}

export default UploadPage

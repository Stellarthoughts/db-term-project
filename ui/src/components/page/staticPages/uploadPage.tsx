import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { MuiFileInput } from "mui-file-input"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { UploadFile } from "../../../request/resources/upload"
import { alertFileUploadError } from "../../../store/alertFailure"
import { alertSelectFile } from "../../../store/alertInfo"
import { setFailure, setInfo, setSuccess } from "../../../store/alertSlice"
import { alertFileUploadSuccess } from "../../../store/alertSuccess"

function UploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const [name, setName] = useState("")
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()

	const handleChange = (value: File | null) => {
		if (value != null)
			setName(value.name)
		setFile(value)
	}

	const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value == "") {
			setName(file?.name ?? "")
			return;
		}
		setName(e.target.value)
	}

	const handleOnClick = async () => {
		if (file == null || user == null) {
			dispatch(setInfo(alertSelectFile))
			return
		}
		try {
			await UploadFile(user.token, file, name)
			dispatch(setSuccess(alertFileUploadSuccess))
		}
		catch (err) {
			dispatch(setFailure(alertFileUploadError))
		}
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
				<Grid spacing={2} justifyContent="center" container>
					<Grid container item xs={12} justifyContent="center">
						<TextField sx={{
							width: "500px"
						}}
							margin="normal"
							fullWidth
							id=""
							label={name}
							name="login"
							onChange={handleChangeText}
						/>
					</Grid>
					<Grid container item xs={12} justifyContent="center">
						<MuiFileInput value={file} onChange={handleChange} sx={{
							width: "500px"
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

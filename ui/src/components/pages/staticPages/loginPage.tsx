import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import useAuth from "../../../auth/useAuth"
import { useAppDispatch } from "../../../hooks/hooks"
import paths from "../../../router/paths"
import { alertInvalidCredentials } from "../../../store/alertFailure"
import { setFailure, setSuccess } from "../../../store/alertSlice"
import { alertSignIn } from "../../../store/alertSuccess"

function LoginPage() {
	const auth = useAuth()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		auth.signin({
			login: data.get('login') as string,
			password: data.get('password') as string
		}, () => {
			navigate("/")
			dispatch(setSuccess(alertSignIn))
		}, () => {
			dispatch(setFailure(alertInvalidCredentials))
		})
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
				Войти в существующий аккаунт
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="login"
							label="Логин"
							name="login"
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Войти
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link variant="body2">
							<RouterLink to={paths.register.absolutePath}>
								{"У вас еще нет аккаунта? Зарегистрируйтесь здесь"}
							</RouterLink>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box >
	)
}

export default LoginPage

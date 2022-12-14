import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth"
import { useAppDispatch } from "../../hooks/hooks"
import { setFailure } from "../../store/alertSlice"

export function RegistrationPage() {
	const auth = useAuth()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		auth.register({
			login: data.get('login') as string,
			password: data.get('password') as string
		}, () => {
			navigate("/")
		}, () => {
			dispatch(setFailure({
				message: "Could not register",
				show: true
			}))
		})
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
				Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="login"
							label="Login"
							name="login"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="password"
							label="Password"
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
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="#" variant="body2">
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default RegistrationPage

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth"

function LoginPage() {
	const auth = useAuth()
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		auth.signin("fuck you", () => { console.log(auth.user.current) })
		navigate("/")
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
				Sign in
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="login"
							label="Login"
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
					Sign In
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="#" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box >
	)
}

export default LoginPage

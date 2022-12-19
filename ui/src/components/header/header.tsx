import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth"
import paths from "../../router/paths"
import { useAppSelector } from "../../hooks/hooks"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

function Header() {
	const user = useAppSelector(state => state.user.user)
	const auth = useAuth()
	const navigate = useNavigate()

	const handleOnClickExit = () => {
		auth.signout(() => (navigate(paths.root.absolutePath)))
	}

	const handleOnClickSuper = () => {
		auth.superuser(() => (navigate(paths.root.absolutePath)))
	}

	return (
		<Box sx={{
			display: 'flex',
			minHeight: '60px',
			paddingTop: '7px',
			paddingBottom: '10px',
			paddingLeft: '20px',
			paddingRight: '20px',
			backgroundColor: "common.white",
			boxShadow: 1,
		}}>
			<Grid container justifyContent="space-between" alignItems="center" direction="row">
				<Grid item xs={12} sm={6}>
					<Typography variant="h6">
						{
							user ? `Добро пожаловать, ${user.login}!` : "Добро пожаловать в WebBook!"
						}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} container alignItems="center" justifyContent="flex-end">
					<Grid item>
						{
							user ? <Button onClick={handleOnClickSuper}>Стать суперпользователем</Button> : <></>
						}
					</Grid>
					<Grid item>
						{
							user ? <Button onClick={handleOnClickExit}>Выйти</Button> : <></>
						}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Header

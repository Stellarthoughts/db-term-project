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
			marginTop: '10px',
			minHeight: '50px',
			paddingLeft: '20px',
			paddingRight: '20px'
		}}>
			<Grid justifyContent="space-between" container>
				<Grid item>
					<Typography>
						{
							user ? `Добро пожаловать, ${user.login}!` : "Добро пожаловать в WebBook!"
						}
					</Typography>
				</Grid>
				<Grid item>
					{
						user ? <Button onClick={handleOnClickSuper}>Стать суперпользователем</Button> : <></>
					}
					{
						user ? <Button onClick={handleOnClickExit}>Выйти</Button> : <></>
					}
				</Grid>
			</Grid>
		</Box>
	)
}

export default Header

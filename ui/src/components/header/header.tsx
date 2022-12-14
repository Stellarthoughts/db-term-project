import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth"
import paths from "../../router/paths"
import { useAppSelector } from "../../hooks/hooks"
import { Typography } from "@mui/material"

function Header() {
	const user = useAppSelector(state => state.user.user)
	const auth = useAuth()
	const navigate = useNavigate()

	const handleOnClick = () => {
		auth.signout(() => (navigate(paths.root.path)))
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: '10px',
			minHeight: '50px',
		}}>
			<Typography>
				{
					user ? `Добро пожаловать, ${user.login}!` : "Добро пожаловать в WebBook!"
				}
			</Typography>
			{
				user ? <Button onClick={handleOnClick}>Signout</Button> : <></>
			}
		</Box>
	)
}

export default Header

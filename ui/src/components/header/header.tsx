import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth"
import paths from "../../router/paths"
import { useAppSelector } from "../../hooks/hooks"

function Header() {
	const user = useAppSelector(state => state.user.user)
	const auth = useAuth()
	const navigate = useNavigate()

	const handleOnClick = () => {
		auth.signout(() => (navigate(paths.root.path)))
	}

	return (
		<Box>
			{
				user ? <Button onClick={handleOnClick}>Signout</Button> : <></>
			}
		</Box>
	)
}

export default Header

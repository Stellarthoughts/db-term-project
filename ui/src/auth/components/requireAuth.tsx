import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"
import paths from "../../router/paths"

export function RequireAuth({ children, notAuth = false }: { children: JSX.Element, notAuth?: boolean }) {
	const location = useLocation()
	const user = useAppSelector(state => state.user.user)

	if (!user && !notAuth) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={paths.login.absolutePath} state={{ from: location }} replace />
	}
	else if (user && notAuth) {
		return <Navigate to={paths.root.absolutePath} state={{ from: location }} replace />
	}

	return children
}

export default RequireAuth
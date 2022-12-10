import TreeItem from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../auth/useAuth'
import paths, { findNameFromPath } from '../../router/paths'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'

function Tree() {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.user)
	const location = useLocation()
	const [selected, setSelected] = useState<string>("");

	useEffect(() => {
		setSelected(findNameFromPath(location.pathname))
	}, [location]);

	const handleOnNodeSelect = (
		event: React.SyntheticEvent,
		nodeId: string
	) => {
		switch (nodeId) {
			case paths.root.name:
				navigate(paths.root.path)
				return
			case paths.registration.name:
				navigate(paths.registration.path)
				return
			case paths.login.name:
				navigate(paths.login.path)
				return
			case paths.upload.name:
				navigate(paths.upload.path)
				return
		}
		navigate(`${paths.page.path}/${nodeId}`)
	}

	return (
		<TreeView
			aria-label="entry tree"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			selected={selected}
			onNodeSelect={handleOnNodeSelect}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<TreeItem nodeId={paths.root.name} label="Welcome!" />
			<TreeItem nodeId={paths.registration.name} label="Sign Up" />
			<TreeItem nodeId={paths.login.name} label="Sign In" />
			{
				user ? <TreeItem nodeId={paths.upload.name} label="Upload Resources" /> : <></>
			}


		</TreeView>
	)
}

export default Tree

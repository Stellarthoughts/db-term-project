import TreeItem from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useLocation, useNavigate } from 'react-router-dom'
import paths, { findNameFromPath } from '../../router/paths'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { Entry } from '../../types/dbtypes'

interface Props {
	treeNodes: Array<Entry> | null
}

function Tree({ treeNodes }: Props) {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.user)
	const location = useLocation()
	const [selected, setSelected] = useState<string>("")

	useEffect(() => {
		setSelected(findNameFromPath(location.pathname))
	}, [location])

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
			{
				!user ?
					<>
						<TreeItem nodeId={paths.registration.name} label="Sign Up" />
						<TreeItem nodeId={paths.login.name} label="Sign In" />
					</>
					: <></>
			}
			{
				user ? <TreeItem nodeId={paths.upload.name} label="Upload Resources" /> : <></>
			}
			{
				user && treeNodes ? treeNodes.map(entry => {
					return <TreeItem nodeId={`entry${entry.id}`} key={entry.id} label={entry.name}>
						{
							entry.chapters ? entry.chapters.map(chapter => {
								return <TreeItem
									nodeId={`chapter${chapter.id}`}
									key={chapter.id}
									label={chapter.name} />
							}) : <></>
						}
					</TreeItem>
				}) : <></>
			}
		</TreeView>
	)
}

export default Tree

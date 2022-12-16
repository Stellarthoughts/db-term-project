import TreeItem from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useLocation, useNavigate } from 'react-router-dom'
import paths from '../../router/paths'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { Entry } from '../../types/dbtypes'
import CreateEntryDialog from '../dialog/entry/createEntry'
import DeleteEntryDialog from '../dialog/entry/deleteEntry'

interface Props {
	treeNodes: Array<Entry> | null
	fetchTree: () => void
}

function Tree({ treeNodes, fetchTree }: Props) {
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.user)
	const location = useLocation()
	const [selected, setSelected] = useState<string>("")
	const [showCreate, setCreate] = useState<boolean>(false)
	const [showDelete, setDelete] = useState<boolean>(false)

	const idCreate = "action/create"


	useEffect(() => {
		setSelected(location.pathname)
	}, [location])

	const handleOnNodeSelect = (
		event: React.SyntheticEvent,
		nodeId: string
	) => {
		switch (nodeId) {
			case idCreate:
				setSelected(idCreate)
				setCreate(true)
				return
		}
		navigate(`${nodeId}`)
	}

	return (
		<>
			<CreateEntryDialog open={showCreate} setOpen={setCreate} callBack={fetchTree} />
			<DeleteEntryDialog open={showDelete} setOpen={setDelete} callBack={fetchTree} />
			<TreeView
				aria-label="entry tree"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				selected={selected}
				onNodeSelect={handleOnNodeSelect}
				sx={{ flexGrow: 1, overflowY: 'auto' }}
			>
				<TreeItem nodeId={paths.root.absolutePath} label="Добро пожаловать!" />
				{
					!user ?
						<>
							<TreeItem nodeId={paths.register.absolutePath} label="Зарегистрироваться" />
							<TreeItem nodeId={paths.login.absolutePath} label="Войти" />
						</>
						: <></>
				}
				{
					user ? <TreeItem nodeId={paths.search.absolutePath} label="Поиск" /> : <></>
				}
				{
					user ? <TreeItem nodeId={paths.upload.absolutePath} label="Загрузить ресурсы" /> : <></>
				}
				{
					user?.access?.canCreate ?
						<TreeItem nodeId={idCreate} label="Создать книгу" /> :
						<>
						</>
				}
				{
					user && treeNodes ? treeNodes.map(entry => {
						return <TreeItem nodeId={`${paths.entry.absolutePath}/${entry.id}`} key={entry.id} label={entry.name}>
							{
								entry.chapters ? entry.chapters.map(chapter => {
									return <TreeItem
										nodeId={`${paths.chapter.absolutePath}/${chapter.id}`}
										key={chapter.id}
										label={chapter.name} />
								}) : <></>
							}
						</TreeItem>
					}) : <></>
				}
			</TreeView>
		</>
	)
}

export default Tree

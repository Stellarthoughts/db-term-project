import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { DeletePageById } from "../../../request/model/page"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultPageId?: number
}

function DeletePageDialog({ open, setOpen, callBack, defaultPageId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const pageId = parseInt(data.get('pageId') as string)
		try {
			await DeletePageById(user.token, pageId)
			callBack()
		}
		catch (err) {
			console.log(err)
		}
		setOpen(false)
	}

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<Box sx={{ margin: "20px" }}>
				<DialogTitle>Удалить страницу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID страницы</FormLabel>
						<TextField name="pageId" defaultValue={defaultPageId} />
						<Button type="submit">Удалить</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default DeletePageDialog
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { DeleteChapterById } from "../../../request/model/chapter"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultThreadId?: number
}

function DeleteThreadDialog({ open, setOpen, callBack, defaultThreadId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const threadId = parseInt(data.get('threadId') as string)
		try {
			await DeleteChapterById(user.token, threadId)
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
				<DialogTitle>Удалить нить</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID нити</FormLabel>
						<TextField name="threadId" defaultValue={defaultThreadId} />
						<Button type="submit">Удалить</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default DeleteThreadDialog
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
	defaultChapterId?: number
}

function DeleteChapterDialog({ open, setOpen, callBack, defaultChapterId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const chapterId = parseInt(data.get('chapterId') as string)
		console.log(chapterId)
		try {
			await DeleteChapterById(user.token, chapterId)
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
				<DialogTitle>Удалить главу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID главы</FormLabel>
						<TextField name="chapterId" defaultValue={defaultChapterId} />
						<Button type="submit">Удалить</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default DeleteChapterDialog
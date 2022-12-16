import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import Stack from "@mui/system/Stack"
import { useAppSelector } from "../../../hooks/hooks"
import { PostEntry } from "../../../request/model/entry"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
}

function CreateEntryDialog({ open, setOpen, callBack }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const name = data.get('name') as string
		const personalPageId = parseInt(data.get('personalPageId') as string)
		try {
			await PostEntry(user.token, {
				name: name,
				personalPageId: personalPageId,
				id: 0,
				chapters: []
			})
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
				<DialogTitle>Создать книгу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<Stack spacing={1}>
							<FormLabel>Имя книги</FormLabel>
							<TextField name="name" />
							<FormLabel>ID персональной страницы</FormLabel>
							<TextField name="personalPageId" />
							<Button type="submit">Создать</Button>
						</Stack>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default CreateEntryDialog
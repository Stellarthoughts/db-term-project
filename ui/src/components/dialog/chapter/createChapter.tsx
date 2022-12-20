import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { PostChapter } from "../../../request/model/chapter"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultOrder?: number
	defaultEntryId?: number
}

function CreateChapterDialog({ open, setOpen, callBack, defaultOrder, defaultEntryId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const name = data.get('name') as string
		const personalPageId = parseInt(data.get('personalPageId') as string)
		const entryId = parseInt(data.get('entryId') as string)
		const order = parseInt(data.get('order') as string)
		try {
			await PostChapter(user.token, {
				name: name,
				order: order,
				pages: [],
				personalPageId: personalPageId,
				entryId: entryId,
				id: 0,
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
				<DialogTitle>Создать главу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>Имя главы</FormLabel>
						<TextField name="name" />
						<FormLabel>Номер главы</FormLabel>
						<TextField name="order" defaultValue={defaultOrder} />
						<FormLabel>ID книги</FormLabel>
						<TextField name="entryId" defaultValue={defaultEntryId} />
						<FormLabel>ID персональной страницы</FormLabel>
						<TextField name="personalPageId" />
						<Button type="submit">Создать</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default CreateChapterDialog
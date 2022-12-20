import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { PutChapterById } from "../../../request/model/chapter"
import { Chapter } from "../../../types/dbtypes"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultChapter: Chapter
}

function UpdateChapterDialog({ open, setOpen, callBack, defaultChapter }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const name = data.get('name') as string
		const personalPageId = parseInt(data.get('personalPageId') as string)
		const chapterId = parseInt(data.get('chapterId') as string)
		const entryId = parseInt(data.get('entryId') as string)
		const order = parseInt(data.get('order') as string)
		try {
			await PutChapterById(user.token, {
				name: name,
				order: order,
				pages: [],
				personalPageId: personalPageId,
				entryId: entryId,
				id: chapterId,
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
				<DialogTitle>Обновить главу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID главы</FormLabel>
						<TextField name="chapterId" defaultValue={defaultChapter.id} />
						<FormLabel>Имя главы</FormLabel>
						<TextField name="name" defaultValue={defaultChapter.name} />
						<FormLabel>Номер главы</FormLabel>
						<TextField name="order" defaultValue={defaultChapter.order} />
						<FormLabel>ID книги</FormLabel>
						<TextField name="entryId" defaultValue={defaultChapter.entryId} />
						<FormLabel>ID персональной страницы</FormLabel>
						<TextField name="personalPageId" defaultValue={defaultChapter.personalPageId} />
						<Button type="submit">Обновить</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpdateChapterDialog
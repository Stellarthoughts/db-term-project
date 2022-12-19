import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import Stack from "@mui/system/Stack"
import { useAppSelector } from "../../../hooks/hooks"
import { PutEntryById } from "../../../request/model/entry"
import { Entry } from "../../../types/dbtypes"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void,
	defaultEntry: Entry
}

function UpdateEntryDialog({ open, setOpen, callBack, defaultEntry }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const name = data.get('name') as string
		const personalPageId = parseInt(data.get('personalPageId') as string)
		const entryId = parseInt(data.get('entryId') as string)
		try {
			await PutEntryById(user.token, {
				name: name,
				personalPageId: personalPageId,
				id: entryId,
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
				<DialogTitle>Обновить книгу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<Stack spacing={1}>
							<FormLabel>ID книги</FormLabel>
							<TextField name="entryId" defaultValue={defaultEntry.id} />
							<FormLabel>Имя книги</FormLabel>
							<TextField name="name" defaultValue={defaultEntry.name} />
							<FormLabel>ID персональной страницы</FormLabel>
							<TextField name="personalPageId" defaultValue={defaultEntry.personalPageId} />
							<Button type="submit">Обновить</Button>
						</Stack>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpdateEntryDialog
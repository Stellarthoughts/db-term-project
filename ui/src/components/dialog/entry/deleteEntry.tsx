import { Button, DialogTitle, FormControl, FormLabel, TextField } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import Box from "@mui/system/Box"
import Stack from "@mui/system/Stack"
import { useAppSelector } from "../../../hooks/hooks"
import { DeleteEntryById } from "../../../request/model/entry"

interface Props {
	defaultId?: number
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
}

function DeleteEntryDialog({ open, setOpen, callBack, defaultId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const id = parseInt(data.get('id') as string)
		try {
			await DeleteEntryById(user.token, id)
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
				<DialogTitle>Удалить книгу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<Stack spacing={1}>
							<FormLabel>ID книги</FormLabel>
							<TextField name="id" defaultValue={defaultId == undefined ? "" : defaultId} />
							<Button type="submit">Удалить</Button>
						</Stack>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default DeleteEntryDialog
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { PostPage } from "../../../request/model/page"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultChapterId?: number
	defaultOrder?: number
}

function CreatePageDialog({ open, setOpen, callBack, defaultChapterId, defaultOrder }: Props) {
	const user = useAppSelector(state => state.user.user)


	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const chapterId = parseInt(data.get('chapterId') as string)
		const order = parseInt(data.get('order') as string)
		try {
			await PostPage(user.token, {
				id: 0,
				order: order,
				chapterId: chapterId,
				threads: []
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
				<DialogTitle>Создать страницу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID главы</FormLabel>
						<TextField name="chapterId" defaultValue={defaultChapterId} />
						<FormLabel>Номер страницы</FormLabel>
						<TextField name="order" defaultValue={defaultOrder} />
						<Button type="submit">Создать</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default CreatePageDialog
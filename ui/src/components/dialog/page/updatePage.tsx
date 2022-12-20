import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { PostPage as PutPageById } from "../../../request/model/page"
import { Page } from "../../../types/dbtypes"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultPage: Page
}

function UpdatePageDialog({ open, setOpen, callBack, defaultPage }: Props) {
	const user = useAppSelector(state => state.user.user)


	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const chapterId = parseInt(data.get('chapterId') as string)
		const pageId = parseInt(data.get('pageId') as string)
		const order = parseInt(data.get('order') as string)
		try {
			await PutPageById(user.token, {
				id: pageId,
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
				<DialogTitle>Обновить страницу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID страницы</FormLabel>
						<TextField name="pageId" defaultValue={defaultPage.id} />
						<FormLabel>ID главы</FormLabel>
						<TextField name="chapterId" defaultValue={defaultPage.chapterId} />
						<FormLabel>Номер страницы</FormLabel>
						<TextField name="order" defaultValue={defaultPage.order} />
						<Button type="submit">Создать</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpdatePageDialog
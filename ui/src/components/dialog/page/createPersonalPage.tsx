import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import Box from "@mui/system/Box"
import { useAppSelector } from "../../../hooks/hooks"
import { PostPage } from "../../../request/model/page"
import { Page } from "../../../types/dbtypes"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: (page: Page) => void
	defaultChapterId?: number
}

function CreatePersonalPage({ open, setOpen, callBack }: Props) {
	const user = useAppSelector(state => state.user.user)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!user)
			return
		try {
			const res = await PostPage(user.token, {
				id: 0,
				order: 0,
				chapterId: null,
				threads: []
			})
			if (res != null)
				callBack(res)
		}
		catch (err) {
			console.log(err)
		}
		setOpen(false)
	}

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<Box sx={{ margin: "20px" }}>
				<DialogTitle>Создать персональную страницу</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<Button type="submit">Создать</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default CreatePersonalPage
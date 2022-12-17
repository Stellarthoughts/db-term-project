import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import { useState } from "react"
import { useAppSelector } from "../../../hooks/hooks"
import { PostThread } from "../../../request/model/thread"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultPageId?: number
}

function CreateThreadDialog({ open, setOpen, callBack, defaultPageId }: Props) {
	const user = useAppSelector(state => state.user.user)

	const [radioValue, setRadioValue] = useState('TEXT')

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const content = data.get('content') as string
		const type = (data.get('type') as string)
		const pageId = parseInt(data.get('pageId') as string)
		try {
			await PostThread(user.token, {
				order: 0,
				pageId: pageId,
				id: 0,
				type: type,
				content: content
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
						<FormLabel>Содержимое</FormLabel>
						<TextField name="content" />
						<FormControl>
							<FormLabel id="radio-buttons-group-label">Тип</FormLabel>
							<RadioGroup
								aria-labelledby="radio-buttons-group-label"
								value={radioValue}
								onChange={(event) => setRadioValue(event.target.value)}
								name="type"
							>
								<FormControlLabel value="TEXT" control={<Radio />} label="Текст" />
								<FormControlLabel value="IMAGE" control={<Radio />} label="Изображение" />
								<FormControlLabel value="AUDIO" control={<Radio />} label="Аудио" />
								<FormControlLabel value="VIDEO" control={<Radio />} label="Видео" />
							</RadioGroup>
						</FormControl>
						<FormLabel>ID страницы</FormLabel>
						<TextField name="pageId" defaultValue={defaultPageId} />
						<Button type="submit">Создать</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default CreateThreadDialog
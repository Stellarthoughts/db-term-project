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
import { PutThreadById } from "../../../request/model/thread"
import { Thread } from "../../../types/dbtypes"

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	callBack: () => void
	defaultThread: Thread
}

function UpdateThreadDialog({ open, setOpen, callBack, defaultThread }: Props) {
	const user = useAppSelector(state => state.user.user)

	const [radioValue, setRadioValue] = useState(defaultThread.type)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		if (!user)
			return
		const content = data.get('content') as string
		const pageId = parseInt(data.get('pageId') as string)
		const threadId = parseInt(data.get('threadId') as string)
		const order = parseInt(data.get('order') as string)
		try {
			await PutThreadById(user.token, {
				order: order,
				pageId: pageId,
				id: threadId,
				type: radioValue,
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
				<DialogTitle>Обновить тред</DialogTitle>
				<Box component="form" onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>ID треда</FormLabel>
						<TextField name="threadId" defaultValue={defaultThread.id} />
						<FormLabel>Содержимое</FormLabel>
						<TextField name="content" defaultValue={defaultThread.content} />
						<FormControl>
							<FormLabel id="radio-buttons-group-label">Тип</FormLabel>
							<RadioGroup
								aria-labelledby="radio-buttons-group-label"
								defaultValue={defaultThread.type}
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
						<TextField name="pageId" defaultValue={defaultThread.pageId} />
						<FormLabel>Номер треда</FormLabel>
						<TextField name="order" defaultValue={defaultThread.order} />
						<Button type="submit">Обновить</Button>
					</FormControl>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpdateThreadDialog
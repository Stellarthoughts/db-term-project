import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setFailure, setSuccess } from '../store/alertSlice'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react'

export function AppAlert() {
	const dispatch = useAppDispatch()

	const alertSuccess = useAppSelector(state => state.alert.success)
	const alertFailure = useAppSelector(state => state.alert.failure)
	const alertInformation = useAppSelector(state => state.alert.info)
	const alertWarning = useAppSelector(state => state.alert.warning)

	useEffect(() => {
		console.log("failure")
	}, [alertFailure])

	return (
		<Box>
			<Collapse in={alertSuccess.show}>
				<Alert
					severity="success"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch(setSuccess({
									message: "",
									show: false
								}))
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{alertSuccess.message}
				</Alert>
			</Collapse>
			<Collapse in={alertFailure.show}>
				<Alert
					severity="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch(setFailure({
									message: "",
									show: false
								}))
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{alertFailure.message}
				</Alert>
			</Collapse>
		</Box>
	)
}
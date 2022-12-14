import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { hideFailure, hideInfo, hideSuccess, hideWarning } from '../store/alertSlice'

export function AppAlert() {
	const dispatch = useAppDispatch()
	const location = useLocation()

	const alertSuccess = useAppSelector(state => state.alert.success)
	const alertFailure = useAppSelector(state => state.alert.failure)
	const alertInfo = useAppSelector(state => state.alert.info)
	const alertWarning = useAppSelector(state => state.alert.warning)

	useEffect(() => {
		// hide all alerts with hideAlertname()
		dispatch(hideFailure())
		dispatch(hideSuccess())
		dispatch(hideInfo())
		dispatch(hideWarning())
	}, [location])

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
								dispatch(hideSuccess())
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
								dispatch(hideFailure())
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
			<Collapse in={alertInfo.show}>
				<Alert
					severity="info"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch(hideInfo())
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{alertInfo.message}
				</Alert>
			</Collapse>
			<Collapse in={alertWarning.show}>
				<Alert
					severity="warning"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								dispatch(hideWarning())
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{alertWarning.message}
				</Alert>
			</Collapse>
		</Box>
	)
}
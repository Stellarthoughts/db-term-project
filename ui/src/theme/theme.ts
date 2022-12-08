import { Theme } from "@mui/material/styles"
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string
		}
	}
}

const theme = createTheme()

export default theme
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import App from './App'
import theme from './theme/theme'
import reportWebVitals from './reportWebVitals'
import Provider from 'react-redux/es/components/Provider'
import ReactDOM from 'react-dom'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from './auth/components/provider'

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</PersistGate>
		</ThemeProvider>
	</Provider>,
	document.querySelector('#root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

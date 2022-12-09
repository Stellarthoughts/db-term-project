import React from 'react'
import './App.css'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Tree from './components/tree/tree'
import Header from './components/header/header'
import {
	Routes,
	Route,
} from "react-router-dom"

import LoginPage from './components/pages/loginPage'
import DefaultPage from './components/pages/defaultPage'
import RegistrationPage from './components/pages/registrationPage'
import GenericPage from './components/pages/genericPage'
import AuthProvider from './auth/provider'
import RequireAuth from './auth/requireAuth'
import UploadPage from './components/pages/uploadPage'

import paths from './router/paths'


function App() {

	return (
		<AuthProvider>
			<Container className="App">
				<Stack direction="row">
					<Tree></Tree>
					<Stack>
						<Header></Header>
						<Routes>
							<Route path={paths.root.path} element={<DefaultPage />} />
							<Route path={paths.login.path} element={<LoginPage />} />
							<Route path={paths.registration.path} element={<RegistrationPage />} />
							<Route path={paths.upload.path} element=
								{
									<RequireAuth>
										<UploadPage />
									</RequireAuth>
								}
							/>
							<Route path={`${paths.page.path}/:pageid`} element=
								{
									<RequireAuth>
										<GenericPage />
									</RequireAuth>
								}
							/>
						</Routes>
					</Stack>
				</Stack>
			</Container>
		</AuthProvider>
	)
}

export default App

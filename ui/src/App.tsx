import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import {
	Route, Routes
} from "react-router-dom"
import './App.css'
import Header from './components/header/header'
import Tree from './components/tree/tree'

import AuthProvider from './auth/components/provider'
import RequireAuth from './auth/components/requireAuth'
import DefaultPage from './components/pages/defaultPage'
import GenericPage from './components/pages/genericPage'
import LoginPage from './components/pages/loginPage'
import RegistrationPage from './components/pages/registrationPage'
import UploadPage from './components/pages/uploadPage'

import Grid from '@mui/material/Grid'
import { AppAlert } from './components/alert'
import { useAppSelector } from './hooks/hooks'
import { GetTree } from './request/compound/data'
import paths from './router/paths'
import { Entry } from './types/dbtypes'

function App() {
	const user = useAppSelector(state => state.user.user)
	const [tree, setTree] = useState<Array<Entry> | null>(null)

	useEffect(() => {
		const fetch = async () => {
			if (user == null)
				return
			const res = await GetTree(user.token)
			setTree(res)
		}
		fetch()
	}, [user])

	return (
		<AuthProvider>
			<Grid container justifyContent="center">
				<Grid item xs={0} sm={0} lg={1} />
				<Grid item xs={12} sm={4} lg={2}>
					<Tree treeNodes={tree}></Tree>
				</Grid>
				<Grid item xs={12} sm={8} lg={6}>
					<Stack>
						<Header></Header>
						<AppAlert />
						<Routes>
							<Route path={paths.root.path} element={<DefaultPage />} />
							<Route path={paths.login.path} element=
								{
									<RequireAuth notAuth={true}>
										<LoginPage />
									</RequireAuth>
								}
							/>
							<Route path={paths.registration.path} element=
								{
									<RequireAuth notAuth={true}>
										<RegistrationPage />
									</RequireAuth>
								}
							/>
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
							<Route path={`${paths.entry.path}/:entryid`} element=
								{
									<RequireAuth>
										<GenericPage />
									</RequireAuth>
								}
							/>
							<Route path={`${paths.chapter.path}/:chapterid`} element=
								{
									<RequireAuth>
										<GenericPage />
									</RequireAuth>
								}
							/>
						</Routes>
					</Stack>
				</Grid>
				<Grid item xs={0} sm={0} lg={3} />
			</Grid>
		</AuthProvider>
	)
}

export default App

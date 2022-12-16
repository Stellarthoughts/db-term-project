import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	LoaderFunction,
	Route, RouterProvider
} from "react-router-dom"
import './App.css'
import Header from './components/header/header'
import Tree from './components/tree/tree'

import RequireAuth from './auth/components/requireAuth'
import ChapterPage from './components/pages/chapterPage'
import DefaultPage from './components/pages/defaultPage'
import EntryPage from './components/pages/entryPage'
import GenericPage from './components/pages/genericPage'
import LoginPage from './components/pages/loginPage'
import RegistrationPage from './components/pages/registrationPage'
import UploadPage from './components/pages/uploadPage'

import Grid from '@mui/material/Grid'
import { AppAlert } from './components/alert'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { GetTree } from './request/compound/data'
import { chapterPageDataNull, entryPageDataNull, genericPageDataNull, GetChapterPageData, GetEntryPageData, GetGenericPageData } from './request/compound/pageData'
import paths from './router/paths'
import { Entry } from './types/dbtypes'
import { InvalidTokenError } from './error/error'
import { setFailure } from './store/alertSlice'
import { alertInvalidToken, alertSomethingWentWrong } from './store/alertFailure'
import Box from '@mui/material/Box'
import SearchPage from './components/pages/searchPage'

function App() {
	const user = useAppSelector(state => state.user.user)
	const [tree, setTree] = useState<Array<Entry> | null>(null)
	const dispatch = useAppDispatch()

	const fetchTree = async () => {
		if (user == null)
			return
		try {
			const res = await GetTree(user.token)
			setTree(res)
		}
		catch (err) {
			if (err instanceof InvalidTokenError) {
				dispatch(setFailure(alertInvalidToken))
			}
			else {
				dispatch(setFailure(alertSomethingWentWrong))
			}
		}
	}

	useEffect(() => {
		fetchTree()
	}, [user])

	const pageLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return genericPageDataNull
		try {
			const data = await GetGenericPageData(user.token, parseInt(params.id as string))
			return data
		}
		catch (e) {
			console.log(e)
			return genericPageDataNull
		}
	}

	const chapterLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return chapterPageDataNull
		try {
			const data = await GetChapterPageData(user.token, parseInt(params.id as string))
			return data
		}
		catch (e) {
			console.log(e)
			return chapterPageDataNull
		}
	}

	// entry loader
	const entryLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return entryPageDataNull
		try {
			const data = await GetEntryPageData(user.token, parseInt(params.id as string))
			return data
		}
		catch (e) {
			console.log(e)
			return entryPageDataNull
		}
	}

	function PageStructure({ children }: { children: JSX.Element }) {
		return (
			<Grid container justifyContent="center">
				<Grid item xs={0} sm={0} lg={1} />
				<Grid item xs={12} sm={4} lg={2}>
					<Tree treeNodes={tree} fetchTree={fetchTree}></Tree>
				</Grid>
				<Grid item xs={12} sm={8} lg={6}>
					<Stack>
						<Header></Header>
						<AppAlert />
						<Box sx={{ paddingLeft: "20px", paddingRight: '20px' }}>
							{children}
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={0} sm={0} lg={3} />
			</Grid>
		)
	}

	const router = createBrowserRouter(
		createRoutesFromElements(
			[
				<Route key={1} path={paths.root.absolutePath} element=
					{
						<PageStructure>
							<DefaultPage />
						</PageStructure>
					}
				/>,
				<Route key={2} path={paths.login.absolutePath} element=
					{
						<RequireAuth notAuth={true}>
							<PageStructure>
								<LoginPage />
							</PageStructure>
						</RequireAuth>
					}
				/>,
				<Route key={3} path={paths.register.absolutePath} element=
					{
						<RequireAuth notAuth={true}>
							<PageStructure>
								<RegistrationPage />
							</PageStructure>
						</RequireAuth>
					}
				/>,
				<Route key={4} path={paths.upload.absolutePath} element=
					{
						<RequireAuth>
							<PageStructure>
								<UploadPage />
							</PageStructure>
						</RequireAuth>
					}
				/>,
				<Route key={5} path={`${paths.page.absolutePath}/:id`} element=
					{
						<RequireAuth>
							<PageStructure>
								<GenericPage />
							</PageStructure>
						</RequireAuth>
					}
					loader={pageLoader}
				/>,
				<Route key={6} path={`${paths.entry.absolutePath}/:id`} element=
					{
						<RequireAuth>
							<PageStructure>
								<EntryPage fetchTree={fetchTree} />
							</PageStructure>
						</RequireAuth>
					}
					loader={entryLoader}
				/>,
				<Route key={7} path={`${paths.chapter.absolutePath}/:id`} element=
					{
						<RequireAuth>
							<PageStructure>
								<ChapterPage fetchTree={fetchTree} />
							</PageStructure>
						</RequireAuth>
					}
					loader={chapterLoader}
				/>,
				<Route key={8} path={paths.search.absolutePath} element=
					{
						<RequireAuth>
							<PageStructure>
								<SearchPage />
							</PageStructure>
						</RequireAuth>
					}
				/>
			]
		)
	)

	return (
		<RouterProvider router={router} />
	)
}

export default App

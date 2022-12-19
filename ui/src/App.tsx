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

// DONT TOUCH THIS. Required for video-react
import "../node_modules/video-react/dist/video-react.css";

import RequireAuth from './auth/components/requireAuth'
import ChapterPage, { fetchChapterPage as fetchChapterPageData } from './components/page/dynamicPages/chapterPage'
import DefaultPage from './components/page/staticPages/defaultPage'
import EntryPage, { fetchEntryPage as fetchEntryPageData } from './components/page/dynamicPages/entryPage'
import GenericPage, { fetchGenericPage as fetchGenericPageData } from './components/page/dynamicPages/genericPage'
import LoginPage from './components/page/staticPages/loginPage'
import RegistrationPage from './components/page/staticPages/registrationPage'
import UploadPage from './components/page/staticPages/uploadPage'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AppAlert } from './components/alert'
import SearchPage from './components/page/staticPages/searchPage'
import { InvalidTokenError } from './error/error'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { GetTree } from './request/compound/data'
import paths from './router/paths'
import { alertInvalidToken, alertSomethingWentWrong } from './store/alertFailure'
import { setFailure } from './store/alertSlice'
import { Entry } from './types/dbtypes'
import StatsPage from './components/page/staticPages/statsPage'
import { GetStats } from './request/statistic/stats'

function App() {
	const user = useAppSelector(state => state.user.user)
	const [tree, setTree] = useState<Array<Entry> | null>(null)
	const dispatch = useAppDispatch()

	const updateTree = async () => {
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
		updateTree()
	}, [user])

	const pageLoader: LoaderFunction = async ({ params }) => {
		return await fetchGenericPageData(user, parseInt(params.id as string))
	}

	const chapterLoader: LoaderFunction = async ({ params }) => {
		return await fetchChapterPageData(user, parseInt(params.id as string))
	}

	// entry loader
	const entryLoader: LoaderFunction = async ({ params }) => {
		return await fetchEntryPageData(user, parseInt(params.id as string))
	}

	const statsLoader: LoaderFunction = async () => {
		return user ? await GetStats(user.token) : null
	}

	function PageStructure({ children }: { children: JSX.Element }) {
		return (
			<Grid container justifyContent="center">
				<Grid item xs={0} sm={0} lg={1} />
				<Grid item xs={12} sm={4} lg={2}>
					<Tree treeNodes={tree} updateTree={updateTree}></Tree>
				</Grid>
				<Grid item xs={12} sm={8} lg={6} >
					<Stack>
						<Box sx={{
							marginLeft: "10px"
						}}>
							<Header></Header>
						</Box>
						<AppAlert />
						<Box
							sx={{
								paddingLeft: "20px",
								paddingRight: '20px',
								paddingTop: "20px",
								paddingBottom: "50px",
							}}
						>
							{children}
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={0} sm={0} lg={3} />
			</Grid >
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
								<EntryPage updateTree={updateTree} />
							</PageStructure>
						</RequireAuth>
					}
					loader={entryLoader}
				/>,
				<Route key={7} path={`${paths.chapter.absolutePath}/:id`} element=
					{
						<RequireAuth>
							<PageStructure>
								<ChapterPage updateTree={updateTree} />
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
				/>,
				<Route key={9} path={paths.stats.absolutePath} element=
					{
						<RequireAuth>
							<PageStructure>
								<StatsPage />
							</PageStructure>
						</RequireAuth>
					}
					loader={statsLoader}
				/>
			]
		)
	)

	return (
		<RouterProvider router={router} />
	)
}

export default App

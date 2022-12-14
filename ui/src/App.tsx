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
import DefaultPage from './components/pages/defaultPage'
import GenericPage from './components/pages/genericPage'
import LoginPage from './components/pages/loginPage'
import RegistrationPage from './components/pages/registrationPage'
import UploadPage from './components/pages/uploadPage'
import ChapterPage from './components/pages/chapterPage'
import EntryPage from './components/pages/entryPage'

import Grid from '@mui/material/Grid'
import { AppAlert } from './components/alert'
import { useAppSelector } from './hooks/hooks'
import { GetThreadsByPageId, GetTree } from './request/compound/data'
import { GetChapterById } from './request/model/chapter'
import { GetEntryById } from './request/model/entry'
import { GetPageById } from './request/model/page'
import paths from './router/paths'
import { Chapter, Entry, Page, Thread } from './types/dbtypes'

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

	const pageLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return
		const id = parseInt(params.id as string)
		const page = await GetPageById(user.token, id)
		const threads = await GetThreadsByPageId(user.token, id)
		let chapter: Chapter | null = null
		if (page.chapterId != null) {
			chapter = await GetChapterById(user.token, page.chapterId)
		}
		return {
			parentData: chapter,
			entityData: page,
			entriesData: threads,
		}
	}

	const chapterLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return
		const id = parseInt(params.id as string)
		const chapter = await GetChapterById(user.token, id)
		let personalPage: Page | null = null
		let threads: Thread[] | null = null
		if (chapter.personalPageId != null) {
			personalPage = await GetPageById(user.token, chapter.personalPageId)
			threads = await GetThreadsByPageId(user.token, chapter.personalPageId)
		}
		return {
			parentData: chapter,
			entityData: personalPage,
			entriesData: threads,
		}
	}

	const entryLoader: LoaderFunction = async ({ params }) => {
		if (!user)
			return
		const id = parseInt(params.id as string)
		const entry = await GetEntryById(user.token, id)
		let personalPage: Page | null = null
		let threads: Thread[] | null = null
		if (entry.personalPageId != null) {
			personalPage = await GetPageById(user.token, entry.personalPageId)
			threads = await GetThreadsByPageId(user.token, entry.personalPageId)
		}
		return {
			parentData: entry,
			entityData: personalPage,
			entriesData: threads,
		}
	}

	function PageStructure({ children }: { children: JSX.Element }) {
		return (
			<Grid container justifyContent="center">
				<Grid item xs={0} sm={0} lg={1} />
				<Grid item xs={12} sm={4} lg={2}>
					<Tree treeNodes={tree}></Tree>
				</Grid>
				<Grid item xs={12} sm={8} lg={6}>
					<Stack>
						<Header></Header>
						<AppAlert />
						{children}
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
								<EntryPage />
							</PageStructure>
						</RequireAuth>
					}
					loader={entryLoader}
				/>,
				<Route key={7} path={`${paths.chapter.absolutePath}/:id`} element=
					{
						<RequireAuth>
							<PageStructure>
								<ChapterPage />
							</PageStructure>
						</RequireAuth>
					}
					loader={chapterLoader}
				/>
			]
		)
	)

	return (
		<RouterProvider router={router} />
	)
}

export default App

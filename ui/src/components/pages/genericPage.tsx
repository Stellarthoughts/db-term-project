import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { GenericPageData, genericPageDataNull, GetGenericPageData } from "../../request/compound/pageData"
import paths from "../../router/paths"
import { User } from "../../types/dbtypes"
import ThreadContainer from "./components/thread/threadContainer"

export async function fetchGenericPage(user: User | null, id: number) {
	if (!user)
		return genericPageDataNull
	try {
		const data = await GetGenericPageData(user.token, id)
		return data
	}
	catch (e) {
		console.log(e)
		return genericPageDataNull
	}
}

function GenericPage() {
	const data = useLoaderData()
	const location = useLocation()
	const navigate = useNavigate()
	const { pageData, threadsData, chapterData, otherPagesData } = data as GenericPageData

	const [page, setPage] = useState(pageData)
	const [threads, setThreads] = useState(threadsData)
	const [chapter, setChapter] = useState(chapterData)
	const [otherPages, setOtherPages] = useState(otherPagesData)

	const current = otherPages?.findIndex(x => x.id === page?.id) ?? 0
	const [pageSelected, setPageSelected] = useState(current + 1)

	useEffect(() => {
		setPage(pageData)
		setThreads(threadsData)
		setChapter(chapterData)
		setOtherPages(otherPagesData)
	}, [location])

	const updateGenericPage = async () => {
		if (!page)
			return
		const data = await fetchGenericPage(null, page.id)
		if (!data)
			return
		setPage(data.pageData)
		setThreads(data.threadsData)
		setChapter(data.chapterData)
		setOtherPages(data.otherPagesData)
	}

	const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
		setPageSelected(value)
		if (pageSelected == value)
			return
		if (otherPages && otherPages.at(value - 1)) {
			navigate(`${paths.page.absolutePath}/${otherPages[value - 1].id}`)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{
				chapter ?
					<Typography>
						<Link to={`${paths.chapter.absolutePath}/${chapter.id}`}>
							Глава {chapter.order}
						</Link>
					</Typography> : <></>
			}
			{
				page ?
					<Typography>
						ID страницы {page.id}
					</Typography> : <></>
			}
			{
				threads ? <ThreadContainer threads={threads} updatePage={updateGenericPage} /> :
					<>
						<Typography>
							Похоже, у этой страницы пока нет содержимого!
						</Typography>
					</>
			}
			{
				otherPages ?
					<Pagination
						count={otherPages.length}
						page={pageSelected}
						onChange={handlePageChange} color="primary" />
					: <></>
			}

		</Box>
	)
}

export default GenericPage

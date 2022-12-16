import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useLoaderData, useLocation } from "react-router-dom"
import { GenericPageData } from "../../request/compound/pageData"
import ThreadContainer from "./components/thread/threadContainer"

function GenericPage() {
	const data = useLoaderData()
	const location = useLocation()
	const { pageData, threadsData, chapterData, otherPagesData } = data as GenericPageData

	const [page, setPage] = useState(pageData)
	const [threads, setThreads] = useState(threadsData)
	const [chapter, setChapter] = useState(chapterData)
	const [otherPages, setOtherPages] = useState(otherPagesData)

	useEffect(() => {
		setPage(pageData)
		setThreads(threadsData)
		setChapter(chapterData)
		setOtherPages(otherPagesData)
	}, [location])


	console.log(data)
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
						Глава {chapter.order}
					</Typography> : <></>
			}
			{
				page ?
					<Typography>
						Страница {page.order}
					</Typography> : <></>
			}
			{
				threads ? <ThreadContainer threads={threads} /> :
					<>
						<Typography>
							Похоже, у этой страницы пока нет содержимого!
						</Typography>
					</>
			}
			{
				otherPages ?
					<Pagination count={otherPages.length} color="primary" />
					: <></>
			}

		</Box>
	)
}

export default GenericPage

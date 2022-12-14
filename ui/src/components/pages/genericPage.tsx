import Box from "@mui/material/Box"
import { useLoaderData } from "react-router-dom"
import { Chapter, Page, Thread } from "../../types/dbtypes"

interface EntryPageData {
	pageData: Page
	threadsData: Thread[] | null
	chapterData: Chapter[] | null
	otherPagesData: Page[] | null
}

function EntryPage() {
	const data = useLoaderData()
	const { pageData, threadsData, chapterData, otherPagesData } = data as EntryPageData

	console.log(data)
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
		</Box>
	)
}

export default EntryPage

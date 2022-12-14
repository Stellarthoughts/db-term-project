import Box from "@mui/material/Box"
import { useLoaderData } from "react-router-dom"
import { GenericPageData } from "../../request/compound/pageData"

function GenericPage() {
	const data = useLoaderData()
	const { pageData, threadsData, chapterData, otherPagesData } = data as GenericPageData

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

export default GenericPage

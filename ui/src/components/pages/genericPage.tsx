import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useLoaderData } from "react-router-dom"
import { GenericPageData } from "../../request/compound/pageData"
import ThreadContainer from "./components/thread/threadContainer"

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
			{
				chapterData ?
					<Typography>
						Глава {chapterData.order}
					</Typography> :
					<Typography>
						Эта страница не принадлежит к главе
					</Typography>
			}
			{
				pageData ?
					<Typography>
						Страница {pageData.order}
					</Typography> : <></>
			}
			{
				threadsData ? <ThreadContainer threads={threadsData} /> :
					<>
						<Typography>
							Похоже, у этой страницы пока нет содержимого!
						</Typography>
					</>
			}
			{
				otherPagesData ?
					<Pagination count={otherPagesData.length} color="primary" />
					: <></>
			}

		</Box>
	)
}

export default GenericPage

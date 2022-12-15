import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useLoaderData } from "react-router-dom"
import { ChapterPageData } from "../../request/compound/pageData"
import ThreadContainer from "./components/thread/threadContainer"
import { Link } from "react-router-dom"


function ChapterPage() {
	const data = useLoaderData()
	const { personalPageData, personalPageThreadsData, chapterData, pagesData, otherChaptersData, entryData } = data as ChapterPageData

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
					<>
						<Typography component="h1" variant="h5">
							{chapterData.name}
						</Typography>
					</>
					: <></>
			}
			{
				entryData ?
					<>
						<Typography>
							{"Книга: "}
							<Link to={`/entry/${entryData.id}`}>
								{entryData.name}
							</Link>
						</Typography>
					</> :
					<></>
			}
			{
				pagesData ?
					<>
						<Typography>
							Страницы главы:
						</Typography>
						<Pagination count={pagesData.length} page={0} color="primary" />
					</>
					:
					<>
						<Typography>
							Похоже, в этой главе пока нет страниц!
						</Typography>
					</>
			}
			{
				personalPageData ?
					<>
						{
							personalPageThreadsData ?
								<>
									<ThreadContainer threads={personalPageThreadsData} />
								</>
								:
								<>
									<Typography>
										Похоже, у собственной страницы главы пока нет содержимого!
									</Typography>
								</>
						}

					</>
					:
					<>
						<Typography>
							Похоже, у этой главы пока нет собственной страницы!
						</Typography>
					</>
			}
		</Box>
	)
}

export default ChapterPage

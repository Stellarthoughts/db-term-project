import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useLoaderData } from "react-router-dom"
import { ChapterPageData } from "../../request/compound/pageData"



function ChapterPage() {
	const data = useLoaderData()
	const { personalPageData, personalPageThreadsData, chapterData, pagesData } = data as ChapterPageData

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
				personalPageData ?
					<>
						{
							personalPageThreadsData ?
								<>
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
			{
				pagesData ?
					<></>
					:
					<>
						<Typography>
							Похоже, в этой главе пока нет страниц!
						</Typography>
					</>
			}
		</Box>
	)
}

export default ChapterPage

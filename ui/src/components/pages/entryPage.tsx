import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useLoaderData } from "react-router-dom"
import { Chapter, Entry, Page, Thread } from "../../types/dbtypes"

interface EntryPageData {
	personalPageData: Page | null
	personalPageThreadsData: Thread[]
	entryData: Entry
	chaptersData: Chapter[] | null
}

function EntryPage() {
	const data = useLoaderData()
	const { personalPageData, personalPageThreadsData, entryData, chaptersData } = data as EntryPageData

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
				entryData ?
					<>
						<Typography component="h1" variant="h5">
							{entryData.name}
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
										Похоже, у собственной страницы книги пока нет содержимого!
									</Typography>
								</>
						}

					</>
					:
					<>
						<Typography>
							Похоже, у этой книги пока нет собственной страницы!
						</Typography>
					</>
			}
			{
				chaptersData ?
					<></>
					:
					<>
						<Typography>
							Похоже, в этой книге пока нет глав!
						</Typography>
					</>
			}
		</Box>
	)
}

export default EntryPage

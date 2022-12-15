import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useLoaderData } from "react-router-dom"
import { EntryPageData } from "../../request/compound/pageData"
import ThreadContainer from "./components/thread/threadContainer"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"


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
					:
					<>
						<Typography>
							Похоже, этой страницы не существует!
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
				entryData && chaptersData ?
					<>
						<Typography>
							Главы:
						</Typography>
						{
							chaptersData.map((chapterData) => {
								return (
									<Link key={chapterData.id} to={`/chapter/${chapterData.id}`}>
										{chapterData.name}
									</Link>
								)
							})
						}
					</>
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

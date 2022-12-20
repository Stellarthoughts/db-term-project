import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { GetSearchResults } from "../../../request/search/query"
import paths from "../../../router/paths"
import { Chapter, Entry } from "../../../types/dbtypes"

function SearchResult({ name, content, navigate }: { name: string, content: string, navigate: string }) {
	return (
		<ListItem sx={{
			boxShadow: 1,
		}}>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography>
					{name}
				</Typography>
				<Link to={navigate}>
					<ListItemText primary={content} />
				</Link>
			</Stack>
		</ListItem>
	)
}

function SearchPage() {
	const user = useAppSelector(state => state.user.user)
	const [displayResults, setDisplayResults] = useState(false)

	const [resultEntries, setResultEntries] = useState<Entry[]>([])
	const [resultChapters, setResultChapters] = useState<Chapter[]>([])

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!user)
			return
		const data = new FormData(event.currentTarget)
		const search = data.get('search')
		try {
			const res = await GetSearchResults(user.token, search as string)
			if (res) {
				setResultEntries(res.entries)
				setResultChapters(res.chapters)
			}
			setDisplayResults(true)
		}
		catch (err) {
			console.log(err)
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
			<Stack spacing={2}>
				<Typography variant="h5">
					Поиск книг и глав по запросу
				</Typography>
				<Box component="form" onSubmit={handleOnSubmit}>
					<Stack spacing={1}>
						<TextField name="search" />
						<Button type="submit">Найти</Button>
					</Stack>
				</Box>
			</Stack>
			<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
			{
				displayResults ?
					<Box >
						{
							(resultEntries.length > 0 || resultChapters.length > 0) ?
								<>
									<Typography variant="h6">Результаты поиска</Typography>
									<List sx={{
										width: "auto",
										maxWidth: "500px",
										marginTop: "10px"
									}}>
										{
											resultEntries.map((entry) => {
												return (
													<Box
														key={`entry/${entry.id}`}
														sx={{
															minWidth: "200px",
															marginBottom: "15px"
														}}
													>
														<SearchResult
															name="Книги"
															content={entry.name}
															navigate={`${paths.entry.absolutePath}/${entry.id}`} />
													</Box>
												)
											})
										}
										{
											resultChapters.map((chapter) => {
												return (
													<Box
														key={`chapter/${chapter.id}`}
														sx={{
															minWidth: "200px",
															marginBottom: "15px"
														}}
													>
														<SearchResult
															name="Глава"
															content={chapter.name}
															navigate={`${paths.chapter.absolutePath}/${chapter.id}`} />
													</Box>
												)
											})
										}
									</List>
								</> :
								<>
									<Typography variant="h6">Не найдено результатов по запросу</Typography>
								</>
						}

					</Box>
					:
					<></>
			}
		</Box>
	)
}

export default SearchPage
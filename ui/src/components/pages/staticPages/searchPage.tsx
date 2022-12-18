import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useAppSelector } from "../../../hooks/hooks"
import { GetSearchResults } from "../../../request/search/query"
import { Chapter, Entry } from "../../../types/dbtypes"
import paths from "../../../router/paths"

function SearchResult({ content, navigate }: { content: string, navigate: string }) {
	return (
		<ListItem>
			<Link to={navigate}>
				<ListItemText primary={content} />
			</Link>
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
			<Typography component="h1" variant="h5">
				Поиск
			</Typography>
			<Box component="form" onSubmit={handleOnSubmit}>
				<Stack spacing={1}>
					<TextField name="search" />
					<Button type="submit">Найти</Button>
				</Stack>
			</Box>
			{
				displayResults ?
					<Box >
						<Typography>Результаты поиска</Typography>
						<List>
							{
								resultEntries.map((entry) => {
									return (
										<SearchResult
											key={`entry/${entry.id}`}
											content={`Книга ${entry.name}`}
											navigate={`${paths.entry.absolutePath}/${entry.id}`} />
									)
								})
							}
							{
								resultChapters.map((chapter) => {
									return (
										<SearchResult
											key={`chapter/${chapter.id}`}
											content={`Глава ${chapter.name}`}
											navigate={`${paths.chapter.absolutePath}/${chapter.id}`} />
									)
								})
							}
						</List>
					</Box>
					:
					<></>
			}
		</Box>
	)
}

export default SearchPage
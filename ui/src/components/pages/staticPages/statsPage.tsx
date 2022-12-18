import Box from "@mui/material/Box"
import { useLoaderData } from "react-router-dom"
import { Stats } from "../../../types/dbtypes"

function StatsPage() {
	const data = useLoaderData() as Stats

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{
				data ?
					<>
						Книги {data.entryCount}
						Главы {data.chapterCount}
						Страницы {data.pageCount}
						Треды {data.threadCount}
						Пользователи {data.userCount}
					</> : <></>
			}
		</Box >
	)
}

export default StatsPage

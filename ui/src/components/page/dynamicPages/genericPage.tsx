import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { GenericPageData, genericPageDataNull, GetGenericPageData } from "../../../request/compound/pageData"
import paths from "../../../router/paths"
import { User } from "../../../types/dbtypes"
import DeletePageDialog from "../../dialog/page/deletePage"
import UpdatePageDialog from "../../dialog/page/updatePage"
import CreateThreadDialog from "../../dialog/thread/createThread"
import ThreadContainer from "../../thread/threadContainer"

export async function fetchGenericPage(user: User | null, id: number) {
	if (!user)
		return genericPageDataNull
	try {
		const data = await GetGenericPageData(user.token, id)
		return data
	}
	catch (e) {
		console.log(e)
		return genericPageDataNull
	}
}

function GenericPage() {
	const data = useLoaderData()
	const location = useLocation()
	const navigate = useNavigate()
	const user = useAppSelector(state => state.user.user)
	const { pageData, threadsData, chapterData, otherPagesData } = data as GenericPageData

	const [page, setPage] = useState(pageData)
	const [threads, setThreads] = useState(threadsData)
	const [chapter, setChapter] = useState(chapterData)
	const [otherPages, setOtherPages] = useState(otherPagesData)

	const current = otherPages?.findIndex(x => x.id === page?.id) ?? 0
	const [pageSelected, setPageSelected] = useState(current + 1)

	const [createThreadDialogOpen, setCreateThreadDialogOpen] = useState(false)
	const [deletePageDialogOpen, setDeletePageDialogOpen] = useState(false)
	const [updatePageDialogOpen, setUpdatePageDialogOpen] = useState(false)

	useEffect(() => {
		setPage(pageData)
		setThreads(threadsData)
		setChapter(chapterData)
		setOtherPages(otherPagesData)
	}, [location])

	const updateGenericPage = async () => {
		if (!page)
			return
		const data = await fetchGenericPage(user, page.id)
		if (!data)
			return
		setPage(data.pageData)
		setThreads(data.threadsData)
		setChapter(data.chapterData)
		setOtherPages(data.otherPagesData)
	}

	const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
		setPageSelected(value)
		if (pageSelected == value)
			return
		if (otherPages && otherPages.at(value - 1)) {
			navigate(`${paths.page.absolutePath}/${otherPages[value - 1].id}`)
		}
	}

	return (
		<>
			{
				page ? <UpdatePageDialog
					open={updatePageDialogOpen}
					setOpen={setUpdatePageDialogOpen}
					callBack={updateGenericPage}
					defaultPage={page}
				/>
					: <> </>
			}
			{
				page ? <DeletePageDialog
					open={deletePageDialogOpen}
					setOpen={setDeletePageDialogOpen}
					callBack={updateGenericPage}
					defaultPageId={page.id} />
					: <> </>
			}
			{
				page ? <CreateThreadDialog
					open={createThreadDialogOpen}
					setOpen={setCreateThreadDialogOpen}
					callBack={updateGenericPage}
					defaultPageId={page.id}
				/> : <> </>
			}
			<Box
			>
				<Grid container justifyContent="space-between">
					<Grid item container xs={4} justifyContent="flex-start" >
						{
							page ? <Button onClick={() => setUpdatePageDialogOpen(true)}>
								Редактировать страницу
							</Button>
								: <></>
						}
					</Grid>
					<Grid item container xs={4} justifyContent="center" alignContent="center">
						{
							chapter ?
								<Typography>
									<Link to={`${paths.chapter.absolutePath}/${chapter.id}`}>
										Глава {chapter.name}
									</Link>
								</Typography> : <></>}
					</Grid>
					<Grid item container xs={4} justifyContent="flex-end" >
						{
							page ? <Button onClick={() => setDeletePageDialogOpen(true)}>
								Удалить страницу
							</Button> : <></>
						}
					</Grid>
					<Grid item container xs={12} alignItems="center" justifyContent="center">
						{
							page ?
								<Typography>
									ID страницы {page.id}
								</Typography> : <></>}
					</Grid>
				</Grid>
				{
					otherPages ?
						<Box my={2} display="flex" justifyContent="center">
							<Pagination
								count={otherPages.length}
								page={pageSelected}
								onChange={handlePageChange} color="primary" />
						</Box>
						: <></>
				}
				<Divider variant="middle" sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
				{
					page ? <Button onClick={() => setCreateThreadDialogOpen(true)}>
						Добавить тред в страницу
					</Button> : <></>
				}
				{
					threads ?
						<Box sx={{ paddingLeft: "10px" }}>
							<ThreadContainer threads={threads} updatePage={updateGenericPage} />
						</Box>
						:
						<></>
				}
				<Divider variant="middle" sx={{ width: "100%", marginTop: "20px", marginBottom: "10px" }} />
				{
					otherPages ?
						<Box my={2} display="flex" justifyContent="center">
							<Pagination
								count={otherPages.length}
								page={pageSelected}
								onChange={handlePageChange} color="primary" />
						</Box>
						: <></>
				}
			</Box></>
	)
}

export default GenericPage
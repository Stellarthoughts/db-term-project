import { Stats } from "../../types/dbtypes"
import { generalHandling, GetRequest } from "../common"

export const GetStats = async (token: string) => {
	try {
		const response = await GetRequest("/api/statistic", token)
		const body = response.data.body
		const res: Stats = {
			entryCount: body.entryCount,
			userCount: body.userCount,
			chapterCount: body.chapterCount,
			threadCount: body.threadCount,
			pageCount: body.pageCount
		}
		return res
	}
	catch (err) {
		return generalHandling(err)
	}
}
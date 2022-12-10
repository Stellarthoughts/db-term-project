import { ParseEntry } from "../../types/dbparsers"
import { GetRequest, isFailed } from "../common"

export const GetTree = async (token: string) => {
	try {
		const response = await GetRequest("/api/data/tree", token)
		if (isFailed(response))
			throw new Error("Response failed")
		return (response.data.body as Array<any>).filter(x => ParseEntry(x))
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
import axios from "axios"
import useAuth from "../../auth/useAuth"
import { GetRequest, ResponseDataOrNull } from "../common"

export const GetTree = async () => {
	const auth = useAuth()
	if (auth.user == null)
		return null
	try {
		const response = await GetRequest("/api/data/tree")
		return ResponseDataOrNull(response)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
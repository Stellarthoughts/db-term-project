import axios from "axios"
import useAuth from "../../auth/useAuth"
import { useAppSelector } from "../../hooks/hooks"
import { GetRequest, ResponseDataOrNull } from "../common"

export const GetTree = async (token: string) => {
	const user = useAppSelector(state => state.user.user)
	if (!user)
		return null
	try {
		const response = await GetRequest("/api/data/tree", token)
		return ResponseDataOrNull(response)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
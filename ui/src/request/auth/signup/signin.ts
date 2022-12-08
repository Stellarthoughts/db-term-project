import { GenRequest } from "../../general";

export const GetAllUsers = async () => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = "/users"
	return await GenRequest(request, configInit);
}
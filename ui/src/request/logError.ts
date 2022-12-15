import { AxiosError } from "axios"

export const LogFetchError = (e: AxiosError) => {
	console.error(`${e.name}: ${e.message}, ${e.code}`)
}


export const GenRequest = async (request: string, configInit: RequestInit) => {
	const response = await fetch(request, configInit)
	const body = await response.json()

	if (response.status !== 200) {
		throw Error(body.message)
	}

	return body
}
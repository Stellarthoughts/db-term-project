export const ResolvePrismaRequest = async (
	req: any
) => {
	try {
		const res = await req
		return res
	}
	catch (e) {
		console.log(e)
		throw e
	}
}
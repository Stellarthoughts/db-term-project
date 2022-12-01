export const ResolvePrismaRequest = async (
	req: unknown
) => {
	try {
		const res = await req
		return res
	}
	catch (e) {
		console.log(e);
	}
}
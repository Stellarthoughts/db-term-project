import { PostRequest } from '../common'

export const UploadFile = async (
	token: string,
	file: File,
	name: string
) => {
	try {
		const formData = new FormData()

		const nameWithExtension = name + "." + file.name.split(".")[1.].concat()
		formData.append(
			"file",
			file as Blob,
			nameWithExtension
		)
		// Update the formData object
		return await PostRequest("/api/upload", token, formData)
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
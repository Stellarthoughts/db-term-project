import { generalHandling, PostRequest } from '../common'

export const UploadFile = async (
	token: string,
	file: File,
	name: string
) => {
	try {
		const formData = new FormData()

		const splitByDot = name.split(".");
		console.log(name)
		console.log(splitByDot)
		if (splitByDot.join() == name) {
			const fileNameSplit = file.name.split(".")
			const extension = fileNameSplit[fileNameSplit.length - 1];
			name = name + "." + extension
		}

		formData.append(
			"file",
			file as Blob,
			name
		)
		// Update the formData object
		return PostRequest("/api/upload", token, formData)
	}
	catch (err) {
		return generalHandling(err)
	}
}
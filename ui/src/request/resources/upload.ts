import { PostRequest } from '../common';

export const UploadFile = async (
	file: File,
	token: string
) => {
	try {
		const formData = new FormData();

		formData.append(
			"file",
			file as Blob,
			file.name
		)
		// Update the formData object
		return await PostRequest("/api/upload", token, formData);
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
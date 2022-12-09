import { PostRequest } from '../common';

export const UploadFile = async (
	file: File
) => {
	try {
		const formData = new FormData();

		formData.append(
			"file",
			file as Blob,
			file.name
		)
		// Update the formData object
		return await PostRequest("/api/upload", formData);
	}
	catch (err) {
		console.log(err)
		throw err
	}
}
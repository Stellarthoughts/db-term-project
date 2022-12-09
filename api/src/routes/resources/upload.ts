import express from "express"
import appRoot from "app-root-path"
import { UploadedFile } from "express-fileupload"
import { respondFailure, respondSuccess } from "../response/common"

export const router = express.Router()

router.post('/', (req, res) => {
	// Get the file that was set to our field named "image"
	console.log(req.files)
	const image = req.files.file as UploadedFile

	// If no image submitted, exit
	if (!image) {
		respondFailure("No image was submitted", res)
		return
	}

	// Move the uploaded image to our upload folder
	image.mv(appRoot.path + '/public/' + image.name)

	respondSuccess("File was uploaded", res)
	return
})

export default router
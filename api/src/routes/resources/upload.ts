import express from "express"
import { UploadedFile } from "express-fileupload";
import { respondFailure, respondSuccess } from "../response/common";

export const router = express.Router()

router.post('/upload', (req, res) => {
	// Get the file that was set to our field named "image"
	const image = req.files.image as UploadedFile;

	// If no image submitted, exit
	if (!image) {
		respondFailure("No image was submitted", res)
		return
	}

	// Move the uploaded image to our upload folder
	image.mv(__dirname + '/public/' + image.name);

	respondSuccess("File was uploaded", res)
	return
});

export default router
import express from "express"
import { CreateAccess, DeleteAccessByID, FindAllAccesses, FindAccessByID, UpdateAccessByID } from "../../prisma/db/model/access"
import { respondFailure, respondSuccess } from "../response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateAccess(
			req.body.canView == 'true',
			req.body.canEdit == 'true',
			req.body.canCreate == 'true',
			req.body.canDelete == 'true'
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Read All
router.get('/', async (req, res) => {
	try {
		const result = await FindAllAccesses()
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Read by ID
router.get('/:id', async (req, res) => {
	try {
		const result = await FindAccessByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update Access
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateAccessByID(
			parseInt(req.params.id),
			req.body.canView == 'true',
			req.body.canEdit == 'true',
			req.body.canCreate == 'true',
			req.body.canDelete == 'true'
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete Access By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteAccessByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
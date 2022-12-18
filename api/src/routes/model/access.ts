import express from "express"
import { CreateAccess, DeleteAccessById, FindAllAccesses, FindAccessById, UpdateAccessById } from "../../prisma/db/model/access"
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
		const result = await FindAccessById(parseInt(req.params.id))
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
		const result = await UpdateAccessById(
			parseInt(req.params.id),
			req.body.canView,
			req.body.canEdit,
			req.body.canCreate,
			req.body.canDelete
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
		const result = await DeleteAccessById(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
import express from "express"
import { CreateUser, DeleteUserByID, FindAllUsers, FindUserByID, UpdateUserByID } from "../prisma/db/user"
import { respondFailure, respondSuccess } from "./response/common"

const router = express.Router()

// Create
router.post('/', async (req, res) => {
	try {
		const result = await CreateUser(req.body.login, req.body.password)
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
		const result = await FindAllUsers()
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
		const result = await FindUserByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})


// Update User
router.put('/:id', async (req, res) => {
	try {
		const result = await UpdateUserByID(
			parseInt(req.params.id),
			req.body.login,
			req.body.password
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

// Delete User By ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await DeleteUserByID(parseInt(req.params.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false
	}
	return true
})

export default router
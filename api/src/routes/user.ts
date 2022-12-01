import express from "express";
import { CreateUser, DeleteUserByID, FindAllUsers, FindUserByID, UpdateUserByID } from "../prisma/db/user";
import { respondFailure, respondSuccess } from "./response/common";

const router = express.Router();

// Create
router.post('/', async (req, res) => {
	try {
		const result = CreateUser(req.body.login, req.body.password)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false;
	}
	return true;
})

// Read All
router.get('/', (req, res) => {
	try {
		const result = FindAllUsers()
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false;
	}
	return true;
})

// Read by ID
router.get('/:userid', (req, res) => {
	try {
		const result = FindUserByID(parseInt(req.body.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false;
	}
	return true;
})


// Update User
router.put('/:userid', (req, res) => {
	try {
		const result = UpdateUserByID(
			parseInt(req.body.id),
			req.body.login,
			req.body.password
		)
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false;
	}
	return true;
})

// Delete User By ID
router.delete('/:userid', (req, res) => {
	try {
		const result = DeleteUserByID(parseInt(req.body.id))
		respondSuccess(result, res)
	}
	catch (err) {
		respondFailure(err, res)
		return false;
	}
	return true;
})

export default router;
import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"

export const selectUserSettings = {
	id: true,
	login: true,
	accessId: true,
	progressId: true,
}

export const CreateUser = (
	login: string,
	password: string
) => {
	const request = prisma.user.create({
		data: {
			login: login,
			password: password,
			access: {
				create: {}
			},
			progress: {
				create: {}
			}
		},
		select: selectUserSettings
	})
	return ResolvePrismaRequest(request)
}

// Read All
export const FindAllUsers = () => {
	const request = prisma.user.findMany({
		select: selectUserSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindUserById = (
	id: number
) => {
	const request = prisma.user.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectUserSettings,
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const FindUserByLogin = (
	login: string
) => {
	const request = prisma.user.findUniqueOrThrow({
		where: {
			login: login,
		},
		select: selectUserSettings
	})
	return ResolvePrismaRequest(request)
}



// Update User
export const UpdateUserById = (
	id: number,
	login: string,
	password: string,
) => {
	const request = prisma.user.update({
		where: {
			id: id
		},
		data: {
			login: login,
			password: password
		},
		select: selectUserSettings
	})
	return ResolvePrismaRequest(request)
}


// Delete User By ID
export const DeleteUserById = (
	id: number
) => {
	const request = prisma.user.delete({
		where: {
			id: id
		},
		select: selectUserSettings
	})
	return ResolvePrismaRequest(request)
}
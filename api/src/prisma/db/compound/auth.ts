import prisma from "../../prisma"
import { ResolvePrismaRequest } from "../handling/handling"
import { selectAccessSettings } from "../model/access"
import { selectProgressSettings } from "../model/progress"

const selectCompoundUserSettings = {
	id: true,
	login: true,
	accessId: true,
	progressId: true,
	password: true,
	access: {
		select: selectAccessSettings
	},
	progress: {
		select: selectProgressSettings
	}
}

export const RegisterUser = (
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
		select: selectCompoundUserSettings
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const RetrieveUserById = (
	id: number
) => {
	const request = prisma.user.findUniqueOrThrow({
		where: {
			id: id,
		},
		select: selectCompoundUserSettings,
	})
	return ResolvePrismaRequest(request)
}


// Read by ID
export const RetrieveUserByLogin = (
	login: string
) => {
	const request = prisma.user.findUniqueOrThrow({
		where: {
			login: login,
		},
		select: selectCompoundUserSettings
	})
	return ResolvePrismaRequest(request)
}
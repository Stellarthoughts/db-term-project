/* eslint-disable @typescript-eslint/no-explicit-any */
import { Access, Chapter, Entry, Page, Progress, Thread, User } from "./dbtypes"

export function ParseUser(data: any): User {
	return {
		login: data.login,
		id: data.id,
		token: data.token,
		access: data.access ? ParseAccess(data.access) : null,
		progress: data.progress ? ParseProgress(data.progress) : null
	}
}

export function ParseAccess(data: any): Access {
	return {
		id: data.id,
		canView: data.canView,
		canEdit: data.canEdit,
		canCreate: data.canCreate,
		canDelete: data.canDelete
	}
}

export function ParseProgress(data: any): Progress {
	return {
		id: data.id,
		lastPageId: data.lastPageId
	}
}

export function ParseEntry(data: any): Entry {
	return {
		id: data.id,
		name: data.name,
		personalPageId: data.personalPageId,
		chapters: data.chapters ?
			(data.chapters as Array<Chapter>).filter(x => ParseChapter(x)) : null
	}
}

export function ParseChapter(data: any): Chapter {
	return {
		id: data.id,
		order: data.order,
		name: data.name,
		personalPageId: data.personalPageId,
		entryId: data.entryId,
		pages: data.pages ?
			(data.pages as Array<Page>).filter(x => ParsePage(x)) : null
	}
}

export function ParsePage(data: any): Page {
	return {
		id: data.id,
		order: data.order,
		chapterId: data.chapterId,
		threads: data.pages ?
			(data.pages as Array<Thread>).filter(x => ParsePage(x)) : null
	}
}

export function ParseThread(data: any): Thread {
	return {
		id: data.id,
		order: data.order,
		type: data.type,
		content: data.content,
		pageId: data.pageId
	}
}

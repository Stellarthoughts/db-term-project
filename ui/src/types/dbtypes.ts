export interface User {
	id: number
	login: string
	token: string
	progress: Progress | null
	access: Access | null
}

export interface Access {
	id: number
	canView: boolean
	canEdit: boolean
	canCreate: boolean
	canDelete: boolean
}

export interface Progress {
	id: number
	lastPageId: number | null
}

export interface Entry {
	id: number,
	name: string,
	personalPageId: number | null
	chapters: Array<Chapter> | null
}

export interface Chapter {
	id: number,
	order: number,
	name: string,
	personalPageId: number | null,
	entryId: number
	pages: Array<Page> | null
}

export interface Page {
	id: number,
	order: number,
	chapterId: number
	threads: Array<Thread> | null
}

export interface Thread {
	id: number
	order: number
	type: string,
	content: string,
	pageId: number,
}

export const ThreadType = {
	TEXT: "TEXT",
	AUDIO: "AUDIO",
	VIDEO: "VIDEO",
	IMAGE: "IMAGE"
} 
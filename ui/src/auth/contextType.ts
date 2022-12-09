export interface SavedUser {
	id: number
	login: string
	token: string
	progress: {
		id: number,
		lastPageId: number | null
	}
	access: {
		id: number,
		canView: boolean,
		canEdit: boolean,
		canCreate: boolean,
		canDelete: boolean
	}
}

export interface AuthContextType {
	user: SavedUser | null
	register: (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => void
	signin: (user: {
		login: string,
		password: string
	}, callback: VoidFunction) => void
	signout: (callback: VoidFunction) => void
}

export default AuthContextType


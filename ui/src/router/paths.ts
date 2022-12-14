export const findNameFromPath = (path: string): string => {
	for (const [, value] of Object.entries(paths)) {
		if (value.path == path)
			return value.name
	}
	return "/"
}

export const paths =
{
	root: {
		path: "/",
		name: "root"
	},
	login: {
		path: "/login",
		name: "login"
	},
	registration: {
		path: "/register",
		name: "registration"
	},
	upload: {
		path: "/upload",
		name: "upload"
	},
	page: {
		path: "/page",
		name: "page"
	},
	entry: {
		path: "/entry",
		name: "entry"
	},
	chapter: {
		path: "/chapter",
		name: "chapter"
	}
}

export default paths
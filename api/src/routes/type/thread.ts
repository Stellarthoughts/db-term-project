import { ThreadType } from "@prisma/client"

export const parseThreadType = (str: string) => {
	switch (str) {
		case "TEXT":
			return ThreadType.TEXT
		case "AUDIO":
			return ThreadType.AUDIO
		case "IMAGE":
			return ThreadType.IMAGE
		case "VIDEO":
			return ThreadType.VIDEO
	}
}

export default parseThreadType
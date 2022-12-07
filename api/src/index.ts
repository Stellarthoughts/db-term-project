// App components
import express from "express"
import { default as prisma } from "./prisma/prisma"
import bodyParser from "body-parser"

// Route paths
import defaultPath from "./routes/default"
import userPath from "./routes/user"
import accessPath from "./routes/access"
import progressPath from "./routes/progress"
import entryPath from "./routes/entry"
import chapterPath from "./routes/chapter"
import pagePath from "./routes/page"
import threadPath from "./routes/thread"
import authPath from "./routes/auth"

// Middleware
import tokenMiddleware from "./middleware/tokenMiddleware"

// Log the server
async function main() {
	console.log("Server started")
}

// Prisma connection logic
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

// Setup app
const app = express()

// Configure
app.use(bodyParser.json())

// Public
app.get("/", (_, res) => {
	res.status(200).send()
})

app.use("/api/default", defaultPath)
app.use("/api/auth", authPath)

app.all("/api/*", tokenMiddleware)

// Private
app.use("/api/user", userPath)
app.use("/api/access", accessPath)
app.use("/api/progress", progressPath)
app.use("/api/entry", entryPath)
app.use("/api/chapter", chapterPath)
app.use("/api/page", pagePath)
app.use("/api/thread", threadPath)

// Use public for servin static resources
app.use(express.static('public'))

// General response

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))

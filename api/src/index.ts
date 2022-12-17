// App components
import express from "express"
import { default as prisma } from "./prisma/prisma"
import bodyParser from "body-parser"

// Route paths
import defaultPath from "./routes/default"
import userPath from "./routes/model/user"
import accessPath from "./routes/model/access"
import progressPath from "./routes/model/progress"
import entryPath from "./routes/model/entry"
import chapterPath from "./routes/model/chapter"
import pagePath from "./routes/model/page"
import threadPath from "./routes/model/thread"
import authPath from "./routes/compound/auth"
import dataPath from "./routes/compound/data"
import uploadPath from "./routes/resources/upload"
import pageDataPath from "./routes/compound/pageData"
import queryDataPath from "./routes/search/query"
import statisticPath from "./routes/statistic/stats"

// Middleware
import tokenMiddleware from "./middleware/tokenMiddleware"
import fileUpload from "express-fileupload"

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
app.use(fileUpload({
	limits: {
		fileSize: 100000000, // Around 10MB
	},
	abortOnLimit: true,
}))

// Public
app.get("/", (_, res) => {
	res.status(200).send()
})

app.use("/api/default", defaultPath)
app.use("/api/auth", authPath)

// Use public for servin static resources
app.use("/api/static", express.static('public'))

// Token Middleware
app.all("/api/*", tokenMiddleware)

// Private
app.use("/api/pageData", pageDataPath)
app.use("/api/upload", uploadPath)
app.use("/api/data", dataPath)
app.use("/api/user", userPath)
app.use("/api/access", accessPath)
app.use("/api/progress", progressPath)
app.use("/api/entry", entryPath)
app.use("/api/chapter", chapterPath)
app.use("/api/page", pagePath)
app.use("/api/thread", threadPath)
app.use("/api/query", queryDataPath)
app.use("/api/statistic", statisticPath)

// Start
app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))

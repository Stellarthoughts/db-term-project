// App components
import express from "express";
import { default as prisma } from "./prisma/prisma"
import bodyParser from "body-parser"

// Route paths
import { default as defaultPath } from "./routes/default"
import { default as userPath } from "./routes/user"
import { default as accessPath } from "./routes/access"
import { default as progressPath } from "./routes/progress"
import { default as entryPath } from "./routes/entry"
import { default as chapterPath } from "./routes/chapter"
import { default as pagePath } from "./routes/page"
import { default as threadPath } from "./routes/thread"

// Log the server
async function main() {
	console.log("Server started")
}

// Prisma connection logic
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

// Setup app
const app = express();

// Configure
app.use(bodyParser.json())

// Routing
app.use("/api/default/", defaultPath)
app.use("/api/user/", userPath)
app.use("/api/user/access/", accessPath)
app.use("/api/user/progress/", progressPath)
app.use("/api/entry/", entryPath)
app.use("/api/chapter/", chapterPath)
app.use("/api/page/", pagePath)
app.use("/api/thread/", threadPath)

// Use public for servin static resources
app.use(express.static('public'))

// General response
app.get("/", (_, res) => {
	res.status(200).send()
});

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))

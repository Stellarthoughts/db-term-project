import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 5000;

async function main() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.get("/", (_, res) => {
  res.status(200).send();
});

app.listen(port, () => console.log(`Running on port ${port}`));

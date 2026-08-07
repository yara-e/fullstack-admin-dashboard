// src/server.ts
import app from "./app";
import dotenv from "dotenv"
import bcrypt from "bcrypt";
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(await bcrypt.hash('123456', 10));
  console.log(await bcrypt.compare('123456', "$2b$10$gTJcUF7NsT0.hMHPrQUxC.Jg252rzBEg6558T5i71i4js39/a8tfe"))
  console.log(`Server Running on ${PORT} `)


});

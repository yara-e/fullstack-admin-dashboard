// src/server.ts
import app from "./app";
import dotenv from "dotenv"
import bcrypt from "bcrypt";
dotenv.config() ;
const PORT = process.env.PORT || 5000;

app.listen(PORT, async  () => {
  console.log(`Server Running on ${PORT} `)
  
});

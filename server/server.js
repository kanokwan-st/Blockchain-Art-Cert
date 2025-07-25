import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// Send HTML file when visiting root URL
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "../client")));



app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);

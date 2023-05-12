import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.API_PORT || 3000;

// Initialize application
const app: Application = express();

// Use JSON parsing middleware from express
app.use(express.json());

// Use CORS
app.use(cors());

// Use cookie parser
app.use(cookieParser());

// Use routes from routes directory
app.use("/api", routes);

// Use error handler
app.use(errorHandler);

const now = Date();
console.log(now);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

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
// Log all requests (DEBUG ONLY)
// app.use((req, res, next) => {
//   console.log(
//     `Received a ${req.method} request on path ${req.path}, responded with ${res.statusCode}`
//   );
//   next();
// });

// Use JSON parsing middleware from express
app.use(express.json());

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

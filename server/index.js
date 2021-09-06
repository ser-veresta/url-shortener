import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import shortenRouter from "./routes/shorten.js";
import errorHandler from "./middleware/error.js";
import ErrorResponse from "./utils/errorResponse.js";
import { redirectUrl } from "./controller/shorten.js";

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://gopal:1213@cluster0.azvtw.mongodb.net/nodeAuthData";
const PORT = process.env.PORT || 5000;

app.get("/:urlCode", redirectUrl);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/shorten", shortenRouter);

app.use((req, res, next) => {
  next(new ErrorResponse("Page Not Found", 404));
});

app.use(errorHandler);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`The server is running in PORT: ${PORT}`)))
  .catch((err) => console.log(err));

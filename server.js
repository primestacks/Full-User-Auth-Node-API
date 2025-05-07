require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

// importing routers from routes
const authRouter = require("./routes/authRouter");

const dbConnect = require("./config/dbConfig");
// run database
dbConnect();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);

// app.use("/api/auth/", authRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the full user auth appi",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`App listening and running on port ${PORT}`)
);

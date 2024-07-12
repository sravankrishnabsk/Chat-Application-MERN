const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
  })
);


app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running at Port " + PORT,
  });
});

// API END POINTS

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on Port : " + PORT);
  });
});

const express = require("express");
const connectDB = require("./src/utils/database");
const { errorHandler, responseHandler } = require("./src/utils/helper");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());

// database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//global handler
app.use(errorHandler);
app.use(responseHandler);

// routing
const appRouter = require("./src/routes/index");

app.use("/api", appRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running... - :) http://localhost:${port}`);
});

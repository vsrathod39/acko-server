const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

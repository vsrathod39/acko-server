const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

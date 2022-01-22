const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const db = require("./Database/connection");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

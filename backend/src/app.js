if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use((err, req, res, next) => {
  console.error("err", err);
  console.error("message", err.message);
  res.status(err.statusCode || 500).send(err.message || "Internal server error");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

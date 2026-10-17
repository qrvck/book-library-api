import express from "express";
import { sequelize } from "./config/database.ts";
import { Author } from "./models/author.model.ts";
import { Book } from "./models/book.model.ts";
import { authorRouter } from "./routes/author.routes.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { bookRouter } from "./routes/book.routes.ts";

const app = express();
const host = "127.0.0.1";
const port = 7001;

Author.hasMany(Book);
Book.belongsTo(Author);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(port, host, function () {
      console.log(`Server listens http://${host}:${port}`);
    });
  })
  .catch((err) => console.log(err));

// -----

// sequelize
//   .authenticate()
//   .then(() => console.log("Connected."))
//   .catch((err) => console.error("Connection error: ", err));

// -----

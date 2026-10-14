import express from "express";
import { sequelize } from "./config/database.ts";
import { Author } from "./models/author.model.ts";
import { Book } from "./models/book.model.ts";

const app = express();
const host = "127.0.0.1";
const port = 7001;

Author.hasMany(Book);
Book.belongsTo(Author);

app.get("/", (req, res) => {
  res.send("hello");
});

sequelize
  .sync({ force: true })
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

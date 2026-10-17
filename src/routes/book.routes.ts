import express from "express";
import { bookController } from "../controllers/book.controller.ts";

const bookRouter = express.Router();

bookRouter.get("/", bookController.findAll);
bookRouter.get("/:id", bookController.findById);
bookRouter.post("/", bookController.create);
bookRouter.put("/:id", bookController.update);
bookRouter.delete("/:id", bookController.delete);

export { bookRouter };

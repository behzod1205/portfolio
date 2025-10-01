import expenseController from "../controller/expense.controller.js";
import { Router } from "express";

const expenseRouter = Router()

expenseRouter.get("/", expenseController.getAll)
expenseRouter.post("/", expenseController.create)
expenseRouter.delete("/:id", expenseController.delete)

export default expenseRouter
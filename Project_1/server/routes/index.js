import { Router } from "express";
import expenseRouter from "./expense.routes.js";

const MainRouter = Router()

MainRouter.use("/expenses", expenseRouter)

export default MainRouter
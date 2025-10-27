import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addExpense, deleteExpense, getAllExpenses, updateExpense } from "../controllers/expense.controller.js";
const router = express.Router()

router.get('/', authenticate, getAllExpenses)
router.post('/add', authenticate, addExpense)
router.patch('/:id', authenticate, updateExpense)
router.delete('/:id', authenticate, deleteExpense)

export default router
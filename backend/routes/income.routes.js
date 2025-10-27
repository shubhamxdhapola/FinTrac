import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addIncome, deleteIncome, getAllIncome, updateIncome } from "../controllers/income.controller.js";
const router = express.Router()

router.get('/', authenticate, getAllIncome)
router.post('/add', authenticate, addIncome)
router.patch('/:id', authenticate, updateIncome)
router.delete('/:id', authenticate, deleteIncome)

export default router
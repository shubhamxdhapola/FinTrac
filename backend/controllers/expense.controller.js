import Expense from "../models/expense.model.js";

export const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({userId}).sort({_id : -1});
        res.status(200).json(expenses);
    } catch (error) {
        console.log("Error in getAllExpenses Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const addExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All field are required" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save()
        res.status(201).json({ newExpense, message: "Expense created" })

    } catch (error) {
        console.log("Error in addExpense Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateExpense = async (req, res) => {
    try {
        const { icon, category, amount, date } = req.body
        const expenseId = req.params.id;

        const updates = {}

        if (icon) updates.icon = icon
        if (category) updates.category = category
        if (amount) updates.amount = amount
        if (date) updates.date = date;

        const updatedExpense = await Expense.findByIdAndUpdate(
            expenseId,
            updates,
            { new: true, runValidators: true }
        )

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" })
        }

        res.status(200).json({
            updatedExpense,
            message: "Expense updated successfully"
        })
    } catch (error) {
        console.log("Error in updateExpense Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteExpense = async (req, res) => {
    const id = req.params.id;
    try {
        await Expense.findByIdAndDelete(id);
        return res.status(200).json({message : "Expense deleted successfully"})
    } catch (error) {
        console.log("Error in deleteExpense Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}



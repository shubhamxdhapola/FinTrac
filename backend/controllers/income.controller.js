import Income from "../models/income.model.js";

export const getAllIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ _id: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.log("Error in getAllIncome Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const addIncome = async (req, res) => {
    try {
        const userId = req.user._id;
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All field are required" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save()
        res.status(201).json({ newIncome, message: "Income created" })

    } catch (error) {
        console.log("Error in addIncome Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateIncome = async (req, res) => {
    try {
        const { icon, source, amount, date } = req.body
        const incomeId = req.params.id;

        const updates = {}

        if (icon) updates.icon = icon
        if (source) updates.source = source
        if (amount) updates.amount = amount
        if (date) updates.date = date;

        const updatedIncome = await Income.findByIdAndUpdate(
            incomeId,
            updates,
            { new: true, runValidators: true }
        )

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" })
        }

        res.status(200).json({
            updatedIncome,
            message: "Income updated successfully"
        })
    } catch (error) {
        console.log("Error in updateIncome Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteIncome = async (req, res) => {
    const id = req.params.id;
    try {
        await Income.findByIdAndDelete(id);
        return res.status(200).json({ message: "Income deleted successfully" })
    } catch (error) {
        console.log("Error in deleteIncome Controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


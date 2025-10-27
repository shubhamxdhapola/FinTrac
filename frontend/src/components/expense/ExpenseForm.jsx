import { useState } from "react";
import { useSelector } from "react-redux";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

const ExpenseForm = ({ saveExpense, expenseId, deleteExpense }) => {

  const { allExpenses, savingExpense } = useSelector((state) => state.expense);
  const expenseData = allExpenses.find((item) => item._id == expenseId);

  const defaultFormData = {
    icon: (expenseId && expenseData?.icon) || "",
    category: (expenseId && expenseData?.category) || "",
    amount: (expenseId && expenseData?.amount) || "",
    date:
      expenseId && expenseData?.date
        ? moment(expenseData.date).format("YYYY-MM-DD")
        : "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) return; 
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={formData.icon}
        onSelect={(selectedIcon) =>
          setFormData((prevData) => ({
            ...prevData, icon: selectedIcon 
          }))
        }
      />
      <Input
        name="category"
        value={formData.category}
        onChange={(e) => handleOnChange(e)}
        label="Category"
        placeholder="Rent, Bills, etc."
        type="text"
      />
      <Input
        name="amount"
        value={formData.amount}
        onChange={(e) => handleOnChange(e)}
        label="Amount"
        placeholder="10,000"
        type="text"
      />
      <Input
        name="date"
        value={formData.date}
        onChange={(e) => handleOnChange(e)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6 gap-4">
        {expenseId && (
          <button
            className="p-[10px] bg-red-100 text-red-500 rounded-md cursor-pointer hover:bg-red-200 hover:text-red-600 duration-300"
            type="button"
            onClick={() => deleteExpense(expenseId)}
          >
            <LuTrash2 />
          </button>
        )}
        <button
           className={`add-btn add-btn-fill hover:!bg-purple-500 ${savingExpense && '!bg-purple-600/50'}`}
          type="button"
          onClick={() => saveExpense(formData)}
          disabled={savingExpense}
        >
          {savingExpense ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : expenseId ? (
            "Save Expense"
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;

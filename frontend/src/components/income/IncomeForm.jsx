import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopUp";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

const IncomeForm = ({ saveIncome, incomeId, deleteIncome }) => {
  
  const { allIncomes, savingIncome } = useSelector((state) => state.income);
  const incomeData = allIncomes.find((item) => item._id == incomeId);

  const defaultFormData = {
    icon: (incomeId && incomeData?.icon) || "",
    source: (incomeId && incomeData?.source) || "",
    amount: (incomeId && incomeData?.amount) || "",
    date:
      incomeId && incomeData?.date
        ? moment(incomeData.date).format("YYYY-MM-DD")
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
            ...prevData,
            icon: selectedIcon,
          }))
        }
      />
      <Input
        name="source"
        value={formData.source}
        onChange={(e) => handleOnChange(e)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
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
        {incomeId && (
          <button
            className="p-[10px] bg-red-100 text-red-500 rounded-md cursor-pointer hover:bg-red-200 hover:text-red-600 duration-300"
            type="button"
            onClick={() => deleteIncome(incomeId)}
          >
            <LuTrash2 />
          </button>
        )}
        <button
          className={`add-btn add-btn-fill hover:!bg-purple-500 ${
            savingIncome && "!bg-purple-600/50"
          }`}
          type="button"
          onClick={() => saveIncome(formData)}
          disabled={savingIncome}
        >
          {savingIncome ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : incomeId ? (
            "Save Income"
          ) : (
            "Add Income"
          )}
        </button>
      </div>
    </div>
  );
};

export default IncomeForm;

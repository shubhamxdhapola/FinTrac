import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const DeleteAlert = ({ content, onDelete }) => {
  const { deletingIncome } = useSelector((state) => state.income);
  const { deletingExpense } = useSelector((state) => state.expense);
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          className={`add-btn add-btn-fill hover:!bg-purple-500 ${
            deletingExpense || (deletingIncome && "!bg-purple-600/50")
          }`}
          onClick={onDelete}
          type="button"
          disabled={deletingExpense || deletingIncome}
        >
          {deletingIncome || deletingExpense ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

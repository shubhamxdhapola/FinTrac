import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../../redux/slices/expense.slice";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/modals/Modal";
import ExpenseList from "../../components/expense/ExpenseList";
import ExpenseForm from "../../components/expense/ExpenseForm";

const Expense = () => {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const { allExpenses, fetchingExpense } = useSelector(
    (state) => state.expense
  );
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const openEditingForm = (id) => {
    setEditingId(id);
    setOpenExpenseModal(true);
  };

  const closeForm = () => {
    setEditingId(null);
    setOpenExpenseModal(false);
  };

  useEffect(() => {
    dispatch(getAllExpenses())
      .unwrap()
      .catch((err) => {
        toast.error("Something went wrong");
        console.log("Error in fetching expense data : ", err);
      });
    window.scroll(0, 0);
  }, [dispatch]);

  const saveExpense = async (expense) => {
    editingId ? handleEditExpense(expense) : handleAddExpense(expense);
  };

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense))
      .unwrap()
      .then((res) => {
        setOpenExpenseModal(false);
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEditExpense = (expense) => {
    dispatch(
      updateExpense({
        data: expense,
        id: editingId,
      })
    )
      .unwrap()
      .then((res) => {
        closeForm();
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteExpense = async (id) => {
    console.log(id);
    dispatch(deleteExpense(id))
      .unwrap()
      .then((res) => {
        closeForm();
        setOpenDeleteAlert({ show: false, data: null });
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <DashboardLayout activeMenu="Expense">
      {fetchingExpense ? (
        <div>
          <Loader2 className="animate-spin text-lg mx-auto min-h-[calc(100vh-61px)]" />
        </div>
      ) : (
        <div className="my-5 mx-auto relative">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <ExpenseOverview
                transactions={allExpenses}
                onAddExpense={() => setOpenExpenseModal(true)}
              />
            </div>
            {allExpenses?.length ? (
              <ExpenseList
                transactions={allExpenses}
                onEdit={(id) => {
                  openEditingForm(id);
                }}
              />
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-700">
                No data to show
              </div>
            )}
          </div>

          <Modal
            isOpen={openExpenseModal}
            onClose={closeForm}
            title={editingId ? "Edit Expense" : "Add Expense"}
            width="max-w-2xl"
          >
            <ExpenseForm
              saveExpense={saveExpense}
              expenseId={editingId}
              deleteExpense={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
            />
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
            width="max-w-xl"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense details"
              onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Expense;

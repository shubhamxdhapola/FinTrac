import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
  updateIncome,
} from "../../redux/slices/income.slice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Modal from "../../components/modals/Modal";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import IncomeForm from "../../components/income/IncomeForm";

const Income = () => {
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const { allIncomes, fetchingIncome } = useSelector((state) => state.income);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const openEditingForm = (id) => {
    setEditingId(id);
    setOpenIncomeModal(true);
  };

  const closeForm = () => {
    setEditingId(null);
    setOpenIncomeModal(false);
  };

  useEffect(() => {
    dispatch(getAllIncome())
      .unwrap()
      .catch((err) => {
        toast.error("Something went wrong");
        console.log("Error in fetching income data : ", err);
      });
    window.scroll(0, 0);
  }, [dispatch]);

  const saveIncome = async (income) => {
    editingId ? handleEditIncome(income) : handleAddIncome(income);
  };

  const handleAddIncome = async (income) => {
    dispatch(addIncome(income))
      .unwrap()
      .then((res) => {
        setOpenIncomeModal(false);
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEditIncome = async (income) => {
    dispatch(
      updateIncome({
        data: income,
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

  const handleDeleteIncome = async (id) => {
    dispatch(deleteIncome(id))
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
    <DashboardLayout activeMenu="Income">
      {fetchingIncome ? (
        <div>
          <Loader2 className="animate-spin text-lg mx-auto min-h-[calc(100vh-61px)]" />
        </div>
      ) : (
        <div className="my-5 mx-auto relative">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <IncomeOverview
                transactions={allIncomes}
                onAddIncome={() => setOpenIncomeModal(true)}
              />
            </div>
            {allIncomes?.length ? (
              <IncomeList
                transactions={allIncomes}
                onEdit={(id) => openEditingForm(id)}
              />
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-gray-700">
                No data to show
              </div>
            )}
          </div>

          <Modal
            isOpen={openIncomeModal}
            onClose={closeForm}
            title={editingId ? "Edit Income" : "Add Income"}
            width="max-w-2xl"
          >
            <IncomeForm
              saveIncome={saveIncome}
              incomeId={editingId}
              deleteIncome={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
            />
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
            width="max-w-xl"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income details"
              onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Income;

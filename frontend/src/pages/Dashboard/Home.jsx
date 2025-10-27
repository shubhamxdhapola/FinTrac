import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../redux/slices/dashboard.slice";
import { Loader, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import InfoCard from "../../components/cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/charts/ExpenseTransactions";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";
import Last30DaysExpenses from '../../components/dashboard/Last30DaysExpenses'

const Home = () => {
  const { dashboardData, loading } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardData())
      .unwrap()
      .catch((err) => {
        toast.error("Something went wrong");
        console.log("Error in fetching dashboard data : ", err);
      });
    window.scroll(0, 0);
  }, [dispatch]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {loading ? (
        <div>
          <Loader2 className="animate-spin text-lg mx-auto min-h-[calc(100vh-61px)]" />
        </div>
      ) : (
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={(dashboardData?.totalBalance || 0).toLocaleString("en-IN")}
              color="bg-primary"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={(dashboardData?.totalIncome || 0).toLocaleString("en-IN")}
              color="bg-green-500"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={(dashboardData?.totalExpenses || 0).toLocaleString(
                "en-IN"
              )}
              color="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpenses={dashboardData?.totalExpenses || 0}
            />

            <ExpenseTransactions
              transactions={
                dashboardData?.last30DaysExpenses?.transactions || []
              }
              onSeeMore={() => navigate("/expense")}
            />

            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />

            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
              }
              totalIncome={dashboardData?.last60DaysIncome?.total || 0}
            />

            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Home;

import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card relative">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          View All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length ? (
          transactions
            ?.slice(0, 5)
            ?.map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type == "expense" ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteButton
              />
            ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-700">
            No data to show
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

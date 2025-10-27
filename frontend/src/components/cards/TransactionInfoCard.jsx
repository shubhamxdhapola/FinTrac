import { LuUtensils, LuTrendingUp, LuTrendingDown } from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, onEdit }) => {
  const getAmountStyles = () =>
    type == "income" ? "bg-green-50 text-green-500" : "text-red-500 bg-red-50";
  return (
    <div
      className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 cursor-pointer"
      onClick={onEdit}
    >
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? <img src={icon} className="w-6 h-6" /> : <LuUtensils />}
      </div>

      <div className="flex flex-1 items-center justify-between gap-1">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type == "income" ? "+" : "-"} ₹{amount.toLocaleString("en-IN")}
            </h6>
            {type == "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

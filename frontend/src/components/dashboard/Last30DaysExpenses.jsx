import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      {data?.length ? (
        <CustomBarChart data={chartData} />
      ) : (
        <div className="h-100 relative">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-700">
            No data to show
          </div>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;

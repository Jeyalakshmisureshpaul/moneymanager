import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { API } from "../global";

ChartJS.register(ArcElement, Tooltip, Legend);

//History of Total and income and expenses
export function History() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      var response = await axios.get(`${API}/transaction`);
      setData(response.data);
    };
    loadData();
  }, []);
  let income = 0;
  let expense = 0;
  data.map((i) => (income = income + parseInt(i.income)));
  data.map((i) => (expense = expense + parseInt(i.expense)));

  let officeIncome = 0;
  let officeexpense = 0;

  data
    .filter((i) => i.type === "office")
    .map((i) => (officeIncome = officeIncome + parseInt(i.income)));
  data
    .filter((i) => i.type === "office")
    .map((i) => (officeexpense = officeexpense + parseInt(i.expense)));

  let personalIncome = 0;
  let personalexpense = 0;

  data
    .filter((i) => i.type === "personal")
    .map((i) => (personalIncome = personalIncome + parseInt(i.income)));
  data
    .filter((i) => i.type === "personal")
    .map((i) => (personalexpense = personalexpense + parseInt(i.expense)));
  const chartdata = {
    labels: ["Total Income", "Total Expense"],
    datasets: [
      {
        label: "# of Votes",
        data: [income, expense],
        backgroundColor: ["lightgreen", "red"],
        borderColor: ["rgba(255, 99, 1)", "rgba(54, 162, 23)"],
        borderWidth: 1,
      },
    ],
  };
  const chartdata2 = {
    labels: ["Total OfficeIncome", "Total OfficeExpense"],
    datasets: [
      {
        label: "# of Votes",
        data: [officeIncome, officeexpense],
        backgroundColor: ["lightblue", "lightgrey"],
        borderColor: ["rgba(255, 91, 122, 1)", "rgba(54, 122, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const chartdata3 = {
    labels: ["Total PersonalIncome", "Total PersonalExpense"],
    datasets: [
      {
        label: "# of Votes",
        data: [personalIncome, personalexpense],
        backgroundColor: ["indigo", "cyan"],
        borderColor: ["rgb(75, 192, 192)", "rgb(255, 205, 86)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="charts">
      <div className="totalChart">
        <Doughnut data={chartdata} />
      </div>
      <div className="officeChart">
        <Doughnut data={chartdata2} />
      </div>
      <div className="personalChart">
        <Doughnut data={chartdata3} />
      </div>
    </div>
  );
}
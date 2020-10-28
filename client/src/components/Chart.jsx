import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart(props) {
  const { firstChoice, secondChoice } = props;
  const firstName = firstChoice["Province/State"]
    ? firstChoice["Province/State"]
    : firstChoice["Country/Region"];
  const secondName = secondChoice["Province/State"]
    ? secondChoice["Province/State"]
    : secondChoice["Country/Region"];

  const newDataArray = [];

  for (const [key, value] of Object.entries(firstChoice)) {
    let date = new Date(key);
    if (date != "Invalid Date") {
      let newObj = {
        date: key,
        [firstName]: parseInt(value),
        [secondName]: parseInt(secondChoice[key]),
      };
      newDataArray.push(newObj);
    }
  }

  const [totalSummary, setTotalSummary] = useState();

  useEffect(() => {
    fetch("https://api.covid19api.com/world/total")
      .then((res) => res.json())
      .then((res) =>
        setTotalSummary({
          name: "Numbers Summary",
          sick: res["TotalConfirmed"],
          dead: res["TotalDeaths"],
          recovered: res["TotalRecovered"],
        })
      );
  }, []);

  return (
    <>
    <section id="chart-infected">
      <AreaChart
        width={800}
        height={400}
        data={newDataArray}
        margin={{ top: 0, right: 25, left: 60, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorFirst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="navy" stopOpacity={0.8} />
            <stop offset="95%" stopColor="navy" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSecond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="maroon" stopOpacity={0.8} />
            <stop offset="95%" stopColor="maroon" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="bottom" height={50} />
        <Area
          type="monotone"
          dataKey={firstName}
          stroke="navy"
          fillOpacity={1}
          fill="url(#colorFirst)"
        />
        <Area
          type="monotone"
          dataKey={secondName}
          stroke="maroon"
          fillOpacity={1}
          fill="url(#colorSecond)"
        />
      </AreaChart>
      </section>
      {totalSummary && (
        <section id="chart-summary">
        <BarChart
          width={400}
          height={200}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data={[totalSummary]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(totalSummary)[0]} />
          <YAxis hide />
          <Tooltip />
          <Legend />
          <Bar dataKey={Object.keys(totalSummary)[1]} fill="darkred" />
          <Bar dataKey={Object.keys(totalSummary)[2]} fill="darkgray" />
          <Bar dataKey={Object.keys(totalSummary)[3]} fill="green" />
        </BarChart>
        </section>
      )}
    </>
  );
}
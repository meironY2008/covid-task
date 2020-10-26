import {
    Legend,
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
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
  
    return (
      <section id="chart-section">
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
    );
  }
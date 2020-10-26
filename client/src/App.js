import { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";
import csvToJson from "./functions/csvToJson";

const makeSelect = (list) => {
  return list.slice(0, list.length - 1).map((item, index) => {
    return item["Province/State"] ? (
      <option key={index} value={item["Province/State"]}>
        {item["Province/State"]}
      </option>
    ) : (
      <option key={index} value={item["Country/Region"]}>
        {item["Country/Region"]}
      </option>
    );
  });
};

function App() {
  const [list, setList] = useState([]);
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");

  console.log("Hey I'm firstChoice: ", firstChoice);
  console.log("Hey I'm secondChoice: ", secondChoice);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(csvToJson(res));
        setList(csvToJson(res));
        setFirstChoice(csvToJson(res)[0]);
        setSecondChoice(csvToJson(res)[1]);
      });
  }, []);

  return (
    <>
      <header id="header"></header>
      <div id="Page">
        {list.length > 0 && (
          <div>
            <select
              className="drop-down"
              key="firstChoice"
              onChange={(e) =>
                setFirstChoice(
                  list.find((item) => {
                    return item["Province/State"]
                      ? item["Province/State"] === e.target.value
                      : item["Country/Region"] === e.target.value;
                  })
                )
              }
            >
              {makeSelect(list)}
            </select>
            <select
              className="drop-down"
              key="secondChoice"
              onChange={(e) =>
                setSecondChoice(
                  list.find((item) => {
                    return item["Province/State"]
                      ? item["Province/State"] === e.target.value
                      : item["Country/Region"] === e.target.value;
                  })
                )
              }
            >
              {makeSelect(list)}
            </select>
          </div>
        )}
        <Chart firstChoice={firstChoice} secondChoice={secondChoice} />
      </div>
    </>
  );
}

export default App;
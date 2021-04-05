import { units, prettySignalNames } from "/config.js";
console.log("units", units);
const tableBody = document.getElementById("tablebody");

const prettifySignalNames = (uglySignalName) => {
  if (uglySignalName in prettySignalNames) {
    return prettySignalNames[uglySignalName];
  } else {
    return uglySignalName;
  }
};

const myAsyncFunction = async () => {
  // get data from API
  const response = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50"
  );
  // console.log(response);

  // get the json response
  const measurements = await response.json();
  console.log("data:", measurements);

  for (let measurement of measurements) {
    // console.log(signal);

    // create a row table element
    const row = document.createElement("tr");

    let key = Object.keys(measurement.data)[0];

    // console.log("units", units);

    const cellDataArray = [
      measurement.date_time,
      prettifySignalNames(key),
      measurement.data[key],
      units[key],
    ];

    console.log(cellDataArray);

    // create a cell for every value on row array
    for (let cellData of cellDataArray) {
      // create the data cell element
      const cell = document.createElement("td");
      // create the Text Node with the data
      const cellText = document.createTextNode(cellData);

      // append the text to cell
      cell.appendChild(cellText);
      // append cell to row
      row.appendChild(cell);
    }
    // append row to table
    tableBody.appendChild(row);
  }
};

window.onload = function () {
  myAsyncFunction();
  console.log("Page loaded");
};

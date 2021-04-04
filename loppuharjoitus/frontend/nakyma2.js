import { units } from "/config.js";
console.log("units", units);

const tableBody = document.getElementById("tablebody");

const myAsyncFunction = async () => {
  let SIGNAL_NAME = "temperature";

  let table_header_signal_unit = document.getElementById(
    "table_header_signal_unit"
  );
  let title_signal_name = document.getElementById("title_signal_name");
  table_header_signal_unit.textContent = " (" + units[SIGNAL_NAME] + ")";
  title_signal_name.textContent = SIGNAL_NAME;

  // get data from API
  const response = await fetch(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/${SIGNAL_NAME}`
  );
  // console.log(response);

  // get the json response
  const signals = await response.json();
  console.log("data:", signals);

  for (let signal of signals) {
    // console.log(signal);

    // create a row table element
    const row = document.createElement("tr");

    const cellDataArray = [signal.date_time, signal[SIGNAL_NAME]];

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

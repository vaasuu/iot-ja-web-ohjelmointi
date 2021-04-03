const tableBody = document.getElementById("tablebody");

const myAsyncFunction = async () => {
  // get data from API
  const response = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50"
  );
  // console.log(response);

  // get the json response
  const signals = await response.json();
  console.log("data:", signals);

  for (let index in signals) {
    signal = signals[index];
    // console.log(index);
    // console.log(signal);
    // console.log(signal.data);
    // create a row table element
    const row = document.createElement("tr");

    key = Object.keys(signal.data)[0];

    let units = {
      humidity_in: "%",
      humidity_out: "0..1",
      light: "¯\\_(ツ)_/¯",
      rain: "¯\\_(ツ)_/¯",
      temperature: "°C",
      wind_direction: "°",
      wind_speed: "m/s",
    };

    // console.log("units", units);

    const cellDataArray = [signal.date_time, key, signal.data[key], units[key]];

    console.log(cellDataArray);

    // create a cell for every value on row array
    for (cellData of cellDataArray) {
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

import { units, prettySignalNames } from "/config.js";
console.log("units", units);

const prettifySignalNames = (uglySignalName) => {
  if (uglySignalName in prettySignalNames) {
    return prettySignalNames[uglySignalName];
  } else {
    return uglySignalName;
  }
};

const tableBody = document.getElementById("tablebody");

const myAsyncFunction = async () => {
  let SIGNAL_NAME = "temperature";

  let table_header_signal_unit = document.getElementById(
    "table_header_signal_unit"
  );
  let title_signal_name = document.getElementById("title_signal_name");
  table_header_signal_unit.textContent = " (" + units[SIGNAL_NAME] + ")";
  title_signal_name.textContent = prettifySignalNames(SIGNAL_NAME);

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
  addChartThing(signals, SIGNAL_NAME);
};

const addChartThing = async (signals, SIGNAL_NAME) => {
  console.log(signals);
  console.log(typeof parseFloat(signals[0][SIGNAL_NAME]));

  // Get the canvas element from HTML DOM
  const canvasElement = document.getElementById("myChart");

  // Initialize the Chartjs library
  const myChart = new Chart(canvasElement, {
    type: "line",
    data: {
      labels: signals.map((values) => values.date_time),
      datasets: [
        {
          label:
            prettifySignalNames(SIGNAL_NAME) + " (" + units[SIGNAL_NAME] + ")",
          data: signals.map((values) =>
            parseFloat(values[SIGNAL_NAME]).toFixed(2)
          ),
          backgroundColor: "rgba(0, 102, 255, 0.5)",
          borderColor: "blue",
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              // check out https://date-fns.org/v2.19.0/docs/Locale
              tooltipFormat: " dd.MM.y HH:mm:ss",
              // tooltipFormat: 'dd.MM.y HH:mm:ss',
              unit: "second",
              unitStepSize: 1,
              displayFormats: {
                second: "HH:mm:ss",
              },
            },
            ticks: {
              fontColor: "#000",
              maxTicksLimit: 20,
              source: "auto",
            },
          },
        ],
      },
    },
  });
};

window.onload = function () {
  myAsyncFunction();
  console.log("Page loaded");
};

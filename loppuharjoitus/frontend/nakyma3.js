import { units, prettySignalNames } from "/config.js";
console.log("units", units);

let loadingSpinner = (visible) => {
  let spinner = document.getElementById("spinner");
  if (visible) {
    spinner.style.visibility = "visible";
  } else {
    spinner.style.visibility = "hidden";
  }
};

const prettifySignalNames = (uglySignalName) => {
  if (uglySignalName in prettySignalNames) {
    return prettySignalNames[uglySignalName];
  } else {
    return uglySignalName;
  }
};

let time_chooser_Element = document.getElementById("time_chooser");

const timeframeToUrl = (SIGNAL_NAME, baseUrl = "/") => {
  let duration = time_chooser_Element.value;
  console.log(duration);

  if (duration == "now") {
    console.log(baseUrl);
    console.log(SIGNAL_NAME);
    var dataUrl = baseUrl + "v1/weather/" + SIGNAL_NAME;
  } else {
    var dataUrl = baseUrl + "v1/weather/" + SIGNAL_NAME + "/" + duration;
  }

  console.log(dataUrl);
  return dataUrl;
};

const setTitleAndTableUnit = (SIGNAL_NAME) => {
  let title_text = document.getElementById("title_text");
  let duration = time_chooser_Element.value;
  const timeThings = {
    now: "20 latest datapoints of ",
    24: "The last 24 hours of ",
    48: "The last 48 hours of ",
    72: "The last 72 hours of ",
    168: "The last 7 days of ",
    720: "The last 30 days of ",
  };

  title_text.textContent = timeThings[duration];

  let table_header_signal_unit = document.getElementById(
    "table_header_signal_unit"
  );
  let title_signal_name = document.getElementById("title_signal_name");
  table_header_signal_unit.textContent = " (" + units[SIGNAL_NAME] + ")";
  title_signal_name.textContent = prettifySignalNames(SIGNAL_NAME);
};

const getDataFromUrl = async (dataUrl) => {
  // get data from API
  const response = await fetch(`${dataUrl}`);
  // console.log(response);

  // get the json response
  const signals = await response.json();
  return signals;
};

const tableBody = document.getElementById("tablebody");

const addTableFromData = async (SIGNAL_NAME, signals) => {
  console.log(SIGNAL_NAME);
  console.log("data:", signals);

  // clear table
  tableBody.textContent = "";

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

// Get the canvas element from HTML DOM
const canvasElement = document.getElementById("myChart");
// Initialize the Chartjs chart object as a global variable
let myChart = new Chart(canvasElement);

const addChartThing = (signals, SIGNAL_NAME) => {
  console.log(signals);

  // Destroy old chart, so no hover eventlisteners etc. are left over
  myChart.destroy();
  console.log("Destroyed old myChart");

  // Create new chart
  myChart = new Chart(canvasElement, {
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
              tooltipFormat: "dd.MM.y HH:mm:ss",
              // unit: "second",
              displayFormats: {
                second: "HH:mm:ss",
                hour: "HH",
                day: "d MMM",
              },
            },
            ticks: {
              fontColor: "#000",
              maxTicksLimit: 30,
              source: "auto",
            },
          },
        ],
      },
    },
  });
};

const LoadThing = async () => {
  loadingSpinner(true);
  let SIGNAL_NAME = "light";
  let dataUrl = timeframeToUrl(
    SIGNAL_NAME,
    "http://webapi19sa-1.course.tamk.cloud/"
  );
  setTitleAndTableUnit(SIGNAL_NAME);
  let signals = await getDataFromUrl(dataUrl);
  addTableFromData(SIGNAL_NAME, signals);
  addChartThing(signals, SIGNAL_NAME);
  loadingSpinner(false);
  console.log("Page loaded");
};

window.onload = function () {
  LoadThing();
};

time_chooser_Element.addEventListener("change", () => {
  LoadThing();
});

import { units, prettySignalNames, apiBaseUrl } from "/config.js";
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
  console.log("duration:", duration);

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
  const measurements = await response.json();
  return measurements;
};

const tableBody = document.getElementById("tablebody");

const addTableFromData = async (SIGNAL_NAME, measurements) => {
  console.log("SIGNAL_NAME", SIGNAL_NAME);
  console.log("measurement data:", measurements);

  // clear table
  tableBody.textContent = "";

  for (let measurement of measurements) {
    // console.log(signal);

    // create a row table element
    const row = document.createElement("tr");

    const cellDataArray = [measurement.date_time, measurement[SIGNAL_NAME]];

    // console.log(cellDataArray);

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

const addChartThing = (measurements, SIGNAL_NAME) => {
  //console.log(measurements);

  // Destroy old chart, so no hover eventlisteners etc. are left over
  myChart.destroy();
  console.log("Destroyed old myChart");

  // Create new chart
  myChart = new Chart(canvasElement, {
    type: "line",
    data: {
      labels: measurements.map((values) => values.date_time),
      datasets: [
        {
          label:
            prettifySignalNames(SIGNAL_NAME) + " (" + units[SIGNAL_NAME] + ")",
          data: measurements.map((values) =>
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

let signalChooserElement = document.getElementById("signal_chooser");

const fillSignalChooser = async (apiBaseUrl) => {
  if (signalChooserElement.textContent == "") {
    console.log("its empyty… Filling");
    // get signal names from API
    const response = await fetch(`${apiBaseUrl}v1/weather/names`);
    // get the json response
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    jsonResponse.forEach((signalName) => {
      // console.log(signalName);
      let optionElement = document.createElement("option");
      optionElement.textContent = prettifySignalNames(signalName.name);
      optionElement.value = signalName.name;
      signalChooserElement.appendChild(optionElement);
    });
  }
};

const getChosenSignalName = () => {
  let signal_chooserElement = document.getElementById(signal_chooser);
  let SIGNAL_NAME = signal_chooser.value;
  console.log("signal_chooser", signal_chooser);
  return SIGNAL_NAME;
};

const LoadThing = async () => {
  loadingSpinner(true);
  await fillSignalChooser(apiBaseUrl);
  // let SIGNAL_NAME = "temperature";
  let SIGNAL_NAME = getChosenSignalName();
  console.log("SIGNAL_NAME: ", SIGNAL_NAME);
  let dataUrl = timeframeToUrl(SIGNAL_NAME, apiBaseUrl);
  console.log("dataUrl", dataUrl);

  setTitleAndTableUnit(SIGNAL_NAME);
  let measurements = await getDataFromUrl(dataUrl);
  addTableFromData(SIGNAL_NAME, measurements);
  addChartThing(measurements, SIGNAL_NAME);
  loadingSpinner(false);
  console.log("Page loaded");
};

window.onload = function () {
  LoadThing();
};

time_chooser_Element.addEventListener("change", () => {
  LoadThing();
});

signalChooserElement.addEventListener("change", () => {
  LoadThing();
});

let units = {
  humidity_in: "%",
  humidity_out: "%",
  light: "%",
  rain: "mm",
  temperature: "°C",
  wind_direction: "°",
  wind_speed: "m/s",
};

let prettySignalNames = {
  Air_pres_1: "Air pressure 1",
  humidity_in: "humidity inside",
  humidity_out: "humidity outside",
  light: "light level",
  rain: "rain",
  temperature: "temperature",
  wind_direction: "wind direction",
  wind_speed: "wind speed",
};

let apiBaseUrl = "http://webapi19sa-1.course.tamk.cloud/";

export { units, prettySignalNames, apiBaseUrl };

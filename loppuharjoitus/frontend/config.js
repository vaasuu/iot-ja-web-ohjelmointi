let units = {
  humidity_in: "%",
  humidity_out: "%",
  light: "%",
  rain: "mm",
  temperature: "°C",
  wind_direction: "°",
  wind_speed: "m/s",
  Windspeed: "m/s",
  Air_pres_1: "hPa",
  BMP_temp_1: "°C",
  DHT11_hum_1: "%",
  DHT11__temp_1: "°C",
  DS1820_temp_1: "°C",
  HumOut_kry: "%",
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

let apiBaseUrl = "https://webapi19sa-1.course.tamk.cloud/";

export { units, prettySignalNames, apiBaseUrl };

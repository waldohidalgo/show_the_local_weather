"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
async function fetchWeatherData() {
  const location = await getLocation();
  const lat = location.coords.latitude;
  const long = location.coords.longitude;
  const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;
  const responseWeatherAPI = await fetch(url);
  const dataWeather = await responseWeatherAPI.json();
  return dataWeather;
}

function changeCelsiusToFahrenheit(temp) {
  return (temp * 9) / 5 + 32;
}
export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempMode, setTempMode] = useState("C");

  useEffect(() => {
    fetchWeatherData()
      .then((data) => {
        const iconURL = data.weather[0].icon;
        const tempInCelsius = data.main.temp;
        const tempInFahrenheit = changeCelsiusToFahrenheit(tempInCelsius);

        setWeatherData({ iconURL, tempInCelsius, tempInFahrenheit });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="my-[50px]">
      {isLoading ? (
        <div className="flex justify-center flex-col items-center">
          <p className="text-blue-500 text-center font-bold ">Loading...</p>
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center font-bold ">
          Error: <span className=" font-normal underline">{error}</span>
        </p>
      ) : (
        <>
          <table className="border-collapse mx-auto">
            <thead className="bg-slate-200">
              <tr>
                <th className="border border-black p-4">Weather Icon</th>
                <th className="border border-black p-4">Temperature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black ">
                  <div className="flex justify-center items-center">
                    <Image
                      src={weatherData.iconURL}
                      alt="Weather Icon"
                      width={50}
                      height={50}
                    />
                  </div>
                </td>
                <td className="border border-black text-center">
                  {tempMode === "C"
                    ? weatherData.tempInCelsius
                    : weatherData.tempInFahrenheit}{" "}
                  {"°" + tempMode}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="border border-black p-2 rounded-2xl mx-auto mt-4 block bg-green-500 font-bold"
            onClick={() => setTempMode(tempMode === "C" ? "F" : "C")}
          >
            Change to {tempMode === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </>
      )}
    </div>
  );
}

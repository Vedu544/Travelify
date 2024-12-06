import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Buses = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedFrom = searchParams.get("departureStation");
  const selectedTo = searchParams.get("ArrivalStation");
  const selectedDate = searchParams.get("date");
  const selectedAdults = searchParams.get("adults");
  const navigate = useNavigate();
  const [Bus, getBus] = useState([]);
  const [selectedBus, setSelectedBus] = useState([]);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Bus/busDetails",
          {
            params: {
              departureStation: selectedFrom,
              ArrivalStation: selectedTo,
              BusType: selectedBus.join(","),
            },
          }
        );
        getBus(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedFrom && selectedTo) {
      fetchBus();
    }
  }, [selectedFrom, selectedTo, selectedBus]);

  const formatTime = (timeString) => {
    // Remove extra quotes from the time string
    const cleanTimeString = timeString.replace(/^"|"$/g, "");
    const date = new Date(cleanTimeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    // Remove extra quotes from the time strings
    const cleanDepartureTime = departureTime.replace(/^"|"$/g, "");
    const cleanArrivalTime = arrivalTime.replace(/^"|"$/g, "");
    const departure = new Date(cleanDepartureTime);
    const arrival = new Date(cleanArrivalTime);
    const durationInMinutes = (arrival - departure) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  const handleBusClick = (Bus) => {
    navigate(`/BusBook/${Bus.BusNo}`, { state: { selectedAdults } }); // Pass selectedAdults
  };

  const handleBusChange = (Bus) => {
    const { value, checked } = Bus.target;
    setSelectedBus((prev) => {
      const updatedBus = checked 
        ? [...prev, value === "A/C" ? "A/C/Sleeper(2+1)" : value === "NON-AC" ? "NON-AC/Seater" : value==="Seater" ? "NON-AC/Seater": value==="Sleeper" ? "A/C/Sleeper(2+1)" :value]
        : prev.filter((bus) => bus !== value);
      console.log("Updated Bus Types:", updatedBus);
      return updatedBus;
    });
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-40 bg-slate-900 text-white">
        <div className="flex flex-wrap ml-3 gap-2">
          <div className="bg-slate-700 rounded-lg p-2 mt-2">
            <h1 className="text-blue-500">SELECTED FROM</h1>
            <h2 className="text-white">{selectedFrom}</h2>
          </div>
          <div className="bg-slate-700 rounded-lg p-2 mt-2">
            <h1 className="text-blue-500">SELECTED TO</h1>
            <h2 className="text-white">{selectedTo}</h2>
          </div>
          <div className="bg-slate-700 rounded-lg p-2 mt-2">
            <h1 className="text-blue-500">SELECTED DATE</h1>
            <h2 className="text-white">{selectedDate}</h2>
          </div>
          <div className="bg-slate-700 rounded-lg p-2 mt-2">
            <h1 className="text-blue-500">SELECTED ADULTS</h1>
            <h2 className="text-white">{selectedAdults}</h2>
          </div>
        </div>
        <div className=" mt-3 ml-4 md:ml-64 lg:ml-4">
          <h1 className="text-black  font-bold text-xl lg:text-white">
            Bus from {selectedFrom} to {selectedTo}
          </h1>
        </div>
      </div>

      {/* //filter box for sm screen */}
      <div className="flex flex-col md:flex-row  h-full p-5 lg:hidden">
        {/* //filters box  */}
        <div className="block lg:hidden ml-1 bg-white h-4/5 mt-5 p-4 w-full">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          <h3 className="mb-4 text-black mt-4 font-bold">
            Filter By Journey Class
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="air-india-checkbox"
                type="checkbox"
                name="journeyClass"
                value="A/C"
                onChange={handleBusChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="air-india-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                AC
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="indigo-checkbox"
                type="checkbox"
                name="journeyClass"
                value="NON-AC"
                onChange={handleBusChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="indigo-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                NON-AC
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="spice-jet-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Sleeper"
               onChange={handleBusChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="spice-jet-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                SLEEPER
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="vistara-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Seater"
                onChange={handleBusChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="vistara-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Seater
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* //for sm screen flightDetails box */}
      <h1 className="ml-4 mt-2 text-xl font-bold mb-2 lg:hidden">Bus Details</h1>
      <div className="h-full lg:hidden ">
        <div className="border border-black rounded-md h-auto w-auto p-2 ml-4 mr-3">
          {Bus.length > 0 ? (
            Bus.map((Bus) => (
              <div
                key={Bus.BusNo}
                className="flex gap-6 p-2 border border-white mb-8 rounded-md h-24"
              >
                <div>
                  <h1 className="font-bold">{Bus.title}</h1>
                  <h2 className="text-xs">{Bus.BusType}</h2>
                </div>
                <div>
                  <h1 className="text-xl">{formatTime(Bus.departureTime)}</h1>
                  <h2 className="text-sm">{Bus.departureStation}</h2>
                </div>
                <div>
                  <h1 className="text-xl">{formatTime(Bus.ArrivalTime)}</h1>
                  <h2 className="text-sm">{Bus.ArrivalStation}</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg whitespace-nowrap">₹ {Bus.Price.class.sleeperClass}</h1>
                  <div className="flex absolute justify-center items-center mt-14 right-7 gap-2">
                  <h1 className="text-red-500 text-sm mt-6">
                    only {Bus.SeatsAvailable} Seats are available
                  </h1>
                    <button
                      onClick={() => handleFlightClick(flight.FlightNo)}
                      className="bg-sky-600 text-sm whitespace-nowrap text-white p-2 rounded-lg mt-6"
                    >
                      Select Seats & Prices
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-sm">
              No Bus Details Available
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-white h-screen lg:bg-slate-400">
        {/* //filters box  */}
        <div className="hidden lg:block ml-6 bg-white h-5/6 mt-[-30px] p-4 w-full md:w-64">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          {/* //journey class */}
          <h3 class="mb-4 text-black mt-4 font-bold">
            Filter By Journey Class
          </h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="A/C"
                  onChange={handleBusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  AC
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="second-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="NON-AC"
                  onChange={handleBusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="second-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  NON AC
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="third-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Sleeper"
                  onChange={handleBusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="third-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  SLEEPER
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="sleeper-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Seater"
                  onChange={handleBusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="sleeper-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  TWO SEATER
                </label>
              </div>
            </li>
          </ul>
        </div>
        {/* //BusDetailsBox */}
        <div className="hidden lg:block ml-6 bg-white max-h-max mt-[-30px] p-6 w-full md:mr-5">
          {Bus.length > 0 ? (
            Bus.map((Bus) => (
              <div
                key={Bus.BusNo}
                className="ml-1 mr-4 w-full h-48 border bottom-4 border-gray-600 rounded-lg mb-6"
              >
                <div className="flex flex-wrap mt-4">
                  {/* //logo image */}
                  <div className="w-24 h-12 ml-3 gap-1">
                    <div>
                      <h1 className="pt-1 text-2xl font-bold whitespace-nowrap">
                        {Bus.title}
                      </h1>
                      <h2 className="pt-1 font-bold whitespace-nowrap">
                        {Bus.BusType}{" "}
                      </h2>
                    </div>
                  </div>
                  {/* //departure */}
                  <div className="flex flex-col justify-between mt-1 ml-32">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Bus.departureTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Bus.departureStation}
                    </h2>
                  </div>
                  {/* //arrow icon */}
                  <div className="ml-16 mt-4 flex-col">
                    ------------------------------------------
                    <h1 className="text-center">
                      {calculateDuration(Bus.departureTime, Bus.ArrivalTime)}
                    </h1>
                  </div>
                  {/* //Arrival station */}
                  <div className="flex flex-col justify-between mt-1 ml-20">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Bus.ArrivalTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Bus.ArrivalStation}
                    </h2>
                  </div>
                  {/* //price */}
                  <div className="ml-12 mt-2 gap-2">
                    <h1 className="text-2xl text-bold text-blue-700">
                      {" "}
                      ₹ {Bus.Price.class.sleeperClass}
                    </h1>
                  </div>
                </div>
                {/* //seats available */}
                <div className="flex justify-end mr-4 mt-4">
                  <h1 className="text-red-500">
                    {" "}
                    only {Bus.SeatsAvailable} Seats are available
                  </h1>
                </div>
                {/* //hr line */}
                <div className="border-gray-400 border-t-2 mt-3"></div>
                {/* //book Now Button */}
                <div className="flex justify-end mr-2">
                  <button
                    onClick={() => handleBusClick(Bus)}
                    className="bg-blue-600 text-white p-2 rounded-lg mt-2"
                  >
                    Select Seats & Prices
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Bus are not available, Try again later</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Buses;

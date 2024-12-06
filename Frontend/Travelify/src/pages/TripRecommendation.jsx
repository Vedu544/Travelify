import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const TripRecommendation = () => {
  const [cities, setCities] = useState([
    { name: "Bengaluru" },
    { name: "Ahmedabad" },
    { name: "Mumbai" },
    { name: "Jaipur" },
    { name: "Delhi" },
    { name: "Chennai" },
    { name: "Kolkata" },
  ]);
  const [travellers, setTravellers] = useState([
    { count: 1 },
    { count: 2 },
    { count: 3 },
    { count: 4 },
    { count: 5 },
  ]);
  const [budget, setBudget] = useState([
    { range: "1000-3000" },
    { range: "3000-6000" },
    { range: "6000-10000" },
    { range: "10000-15000" },
    { range: "15000-20000" },
    { range: "20000-25000" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTraveller, setSelectedTraveller] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [openCity, setOpenCity] = useState(false);
  const [openTraveller, setOpenTraveller] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [Trips, setTrips] = useState([]);

  const handleTrips = async () => {
    let errorMessage = "";

    if (!selectedCity) {
      errorMessage += "Select a City. ";
    }
    if (!selectedTraveller) {
      errorMessage += "Select Travellers. ";
    }
    if (!selectedBudget) {
      errorMessage += "Select Budget. ";
    }

    if (errorMessage) {
      toast.error(errorMessage.trim());
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/Travel/getTravelPlan",
        {
          location: selectedCity,
          travellers: selectedTraveller,
          budget: selectedBudget,
        }
      );
      setTrips(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start mt-1 gap-3">
        {/* Dropdowns and Button Container */}
        <div className="flex-col mt-2 flex justify-start gap-3 md:flex md:flex-row lg:flex :flex-row ">

          {/* Dropdown 1: Cities */}
          <div className="w-72 font-medium relative">
            <div
              onClick={() => setOpenCity(!openCity)}
              className={`bg-blue-600 w-full p-2 flex items-center justify-between rounded text-white cursor-pointer ${
                !selectedCity && "text-white text-xl"
              }`}
            >
              {selectedCity ? selectedCity : "Select City"}
              <BiChevronDown
                size={20}
                className={`${openCity && "rotate-180 cursor-pointer"}`}
              />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto ${
                openCity ? "max-h-60 absolute z-10 w-full cursor-pointer " : "max-h-0"
              }`}
            >
              <div className="flex items-center px-2 sticky top-0 bg-white">
                <AiOutlineSearch size={18} className="text-black" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                  placeholder="Enter City name"
                  className="placeholder:text-gray-700 p-2 outline-none"
                />
              </div>
              {cities.map((city) => (
                <li
                  key={city.name}
                  className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                    city.name.toLowerCase() === selectedCity.toLowerCase() &&
                    "bg-sky-600 text-white"
                  }`}
                  onClick={() => {
                    if (
                      city.name.toLowerCase() !== selectedCity.toLowerCase()
                    ) {
                      setSelectedCity(city.name);
                      setOpenCity(false);
                      setInputValue("");
                    }
                  }}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown 2: Travellers */}
          <div className="w-72 font-medium relative">
            <div
              onClick={() => setOpenTraveller(!openTraveller)}
              className={`bg-blue-600 w-full p-2 flex items-center justify-between rounded  text-white cursor-pointer ${
                !selectedTraveller && "text-white text-xl"
              }`}
            >
              {selectedTraveller ? selectedTraveller : "Select Travellers"}
              <BiChevronDown
                size={20}
                className={`${openTraveller && "rotate-180"}`}
              />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto ${
                openTraveller ? "max-h-60 absolute z-10 w-full cursor-pointer" : "max-h-0"
              }`}
            >
              {travellers.map((traveller) => (
                <li
                  key={traveller.count}
                  className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                    traveller.count === selectedTraveller &&
                    "bg-sky-600 text-white"
                  }`}
                  onClick={() => {
                    if (traveller.count !== selectedTraveller) {
                      setSelectedTraveller(traveller.count);
                      setOpenTraveller(false);
                    }
                  }}
                >
                  {traveller.count}
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown 3: Budget */}
          <div className="w-72 font-medium relative">
            <div
              onClick={() => setOpenBudget(!openBudget)}
              className={`bg-blue-600 w-full p-2 flex items-center justify-between rounded text-white cursor-pointer ${
                !selectedBudget && "text-white text-xl"
              }`}
            >
              {selectedBudget ? selectedBudget : "Select Budget"}
              <BiChevronDown
                size={20}
                className={`${openBudget && "rotate-180"}`}
              />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto ${
                openBudget ? "max-h-60 absolute z-10 w-full cursor-pointer" : "max-h-0"
              }`}
            >
              {budget.map((budgetRange) => (
                <li
                  key={budgetRange.range}
                  className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                    budgetRange.range === selectedBudget &&
                    "bg-sky-600 text-white"
                  }`}
                  onClick={() => {
                    if (budgetRange.range !== selectedBudget) {
                      setSelectedBudget(budgetRange.range);
                      setOpenBudget(false);
                    }
                  }}
                >
                  {budgetRange.range}
                </li>
              ))}
            </ul>
          </div>

          {/* Search Button aligned with Dropdowns */}
          <div>
            <button
              onClick={handleTrips}
              className="bg-slate-950 text-white p-2.5 rounded"
            >
              Search Trips
            </button>
          </div>
        </div>
      </div>
      {/* Trip Recommendation Section */}
      {Trips.length > 0 ? (
        <div className="mb-10"> 
          <h1 className="text-2xl mt-4 font-bold text-slate-950 ml-6">
            Trip Recommendations According to Your Choice
          </h1>
          <h2 className="ml-6 mt-2 mr-2 text-red-600">This Recommendation is based on round-trip for {selectedTraveller} Travellers </h2>
          <div className="flex flex-col gap-4 ml-6 mt-3 mr-6">
            {Trips.map((trip) => (
              <div key={trip._id} className="border border-gray-800 p-4 rounded-lg">
                <h2 className="text-2xl font-semibold">{`Destination: ${trip.destination}`}</h2>
                <p>{`Places Covered: ${trip.places_covered.join(", ")}`}</p>
                <p>{`Available Trains: ${trip.available_trains.join(", ")}`}</p>
                <p>{`Available Buses: ${trip.available_buses.join(", ")}`}</p>
                <div className="mt-2">
                  <h3 className=" text-xl font-semibold">Approx Charges (Train):</h3>
                  <p>Food: 500-800</p>
                  <p>Transportation: {trip.approx_charges.train.transportation.min}-{trip.approx_charges.train.transportation.max}</p>
                  <p>Stay: {trip.approx_charges.train.stay.min}-{trip.approx_charges.train.stay.max}</p>
                  <p>Entry Fees: 500-800</p>
                  <p className="font-semibold text-xl underline mr-1 mt-1">Total: {trip.approx_charges.train.total.min}-{trip.approx_charges.train.total.max}</p>
                </div>
                <div className="mt-3">
                  <h3 className=" text-xl font-semibold">Approx Charges (Bus):</h3>
                  <p>Food: 500-800</p>
                  <p>Transportation: {trip.approx_charges.bus.transportation.min}-{trip.approx_charges.bus.transportation.max}</p>
                  <p>Stay: {trip.approx_charges.bus.stay.min}-{trip.approx_charges.bus.stay.max}</p>
                  <p>Entry Fees: 500-800</p>
                  <p className="font-semibold text-xl underline mr-1 mt-1">Total: {trip.approx_charges.bus.total.min}-{trip.approx_charges.bus.total.max}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-slate-950 mt-3 ml-6">
            No Trips Found
          </h1>
          <p className="text-sm text-gray-700 ml-6">
            Please select different options and try again.
          </p>
        </div>
      )}
    </>
  );
};

export default TripRecommendation;

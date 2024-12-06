import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Trains = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedFrom = searchParams.get("departureStation");
  const selectedTo = searchParams.get("ArrivalStation");
  const selectedDate = searchParams.get("date");
  const selectedAdults = searchParams.get("adults");
  const [TrainDetails, setTrainDetails] = useState([]);
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Trains/filter/station",
          {
            params: {
              departureStation: selectedFrom,
              arrivalStation: selectedTo,
              trainClass: selectedClass.join(','),
            },
          }
        );
        setTrainDetails(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if ((selectedFrom, selectedTo)) {
      fetchTrains();
    }
  }, [selectedFrom, selectedTo, selectedClass]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationInMinutes = (arrival - departure) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  const handleTrainClick = (Train, trainNumber) => {
    // Find the selected train detail based on the trainNumber
    const selectedTrainDetail = Train.trainDetails.find(detail => detail.trainNumber === trainNumber);

    console.log("selectedTrain", selectedTrainDetail); // Log to check the selected train detail

    navigate(`/TrainBook/${Train.trainNo}`, {
      state: {
        selectedAdults,
        trainClass: selectedTrainDetail.trainClass, // Pass the selected train class
        price: selectedTrainDetail.price, // Pass the price
        seatsAvailable: selectedTrainDetail.seatsAvailable, // Pass the seats available
      },
    });
  };

  const handleClassChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedClass((prev) => [...prev, value]);
    } else {
      setSelectedClass((prev) => prev.filter((className) => className !== value));
    }
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
        <div className="bg-slate-900 mt-5 ml-4 md:ml-64 lg:ml-5 ">
          <h1 className="text-black font-bold text-xl lg:text-white">
            Trains from {selectedFrom} to {selectedTo}
          </h1>
        </div>
      </div>

      {/* //for sm screen */}
      <div className="flex flex-col md:flex-row bg-white h-full p-5 lg:hidden">
        {/* //filters box  */}
        <div className="block lg:hidden ml-1 bg-white h-4/5 mt-5 p-4 w-full">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          <h3 className="mb-4 text-black mt-4 font-bold">
            Filter By Journey Class
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="first-ac-checkbox"
                type="checkbox"
                name="journeyClass"
                value="1st AC"
                onChange={handleClassChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="first-ac-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                1st AC
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="second-ac-checkbox"
                type="checkbox"
                name="journeyClass"
                value="2nd AC"
                onChange={handleClassChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="second-ac-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                2nd AC
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="third-ac-checkbox"
                type="checkbox"
                name="journeyClass"
                value="3rd AC"
                onChange={handleClassChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="third-ac-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                3rd AC
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="sleeper-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Sleeper Class"
                onChange={handleClassChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="sleeper-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Sleeper Class
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="two-seater-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Two Seater"
                onChange={handleClassChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="two-seater-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Two Seater
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* //for sm screen traindeatils box */}
      <h1 className="ml-4 text-xl font-bold mb-3 lg:hidden">Train Details</h1>
      <div className="bg-white h-full lg:hidden">
        <div className="border border-black rounded-md h-auto w-auto p-2 ml-4 mr-3 mb-8">
          {TrainDetails.length > 0 ? (
            TrainDetails.map((Train) => (
              <div
                key={Train.trainNo}
                className="flex flex-col border border-white mb-3 rounded-md h-auto"
              >
                <div className="flex gap-6 p-2">
                  <div>
                    <h1 className="font-bold">{Train.name}</h1>
                    <h2 className="text-sm">{Train.trainNo}</h2>
                  </div>
                  <div>
                    <h1 className="text-xl">
                      {formatTime(Train.departureTime)}
                    </h1>
                    <h2 className="text-sm">{Train.departureStation}</h2>
                  </div>
                  <div>
                    <h1 className="text-xl">{formatTime(Train.arrivalTime)}</h1>
                    <h2 className="text-sm">{Train.arrivalStation}</h2>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 p-2">
                  {Train.trainDetails.map((detail, index) => (
                    <div
                      key={index}
                      onClick={() => handleTrainClick(Train, detail.trainNumber)}
                      className="bg-white text-black border-2 border-black shadow-xl p-1 w-auto cursor-pointer mb-2"
                    >
                      <div className="flex justify-between gap-4">
                        <h1 className="ml-1 mt-1 whitespace-nowrap">
                          {detail.trainClass}
                        </h1>
                        <h1 className="ml-1 mt-1">{detail.price}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-sm">
              Trains are not available, Try again later
            </div>
          )}
        </div>
      </div>

      {/*  //filter box */}
      <div className="flex flex-col md:flex-row bg-slate-400 h-screen">
        <div className="hidden lg:block ml-6 bg-white h-5/6 mt-10 p-4 w-80 md:w-64 lg:mt-[-30px] lg:w-56">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          <h3 className="mb-4 text-black mt-4 font-bold">Filter By Journey class</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="1st AC"
                  onChange={handleClassChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  1st AC
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="2nd AC"
                  onClick={handleClassChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  2nd AC
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="3rd AC"
                  onChange={handleClassChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  3rd AC
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Sleeper"
                  onChange={handleClassChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Sleeper
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Two Seater"
                  onChange={handleClassChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Two Seater
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* //TrainDetailsBox */}
        <div className="hidden lg:block ml-6 bg-white max-h-max mt-[-30px] p-6 w-full md:mr-5">
          {TrainDetails.length > 0 ? (
            TrainDetails.map((Train) => (
              <div
                key={Train.trainNo}
                className="ml-1 mr-4 w-full h-56 border bottom-4 border-gray-600 rounded-lg mb-6"
              >
                <div className="flex flex-wrap mt-4">
                  {/* //logo image */}
                  <div className="w-24 h-12 ml-3 gap-1">
                    <div>
                      <h1 className="pt-1 text-2xl font-bold whitespace-nowrap">
                        {Train.name}
                      </h1>
                      <h2 className="pt-1 font-bold">{Train.trainNo}</h2>
                    </div>
                  </div>
                  {/* //departure */}
                  <div className="flex flex-col justify-between mt-1 ml-32">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Train.departureTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Train.departureStation}
                    </h2>
                  </div>
                  {/* //arrow icon */}
                  <div className="ml-16 mt-4 flex-col">
                    ------------------------------------------
                    <h1 className="text-center">
                      {calculateDuration(
                        Train.departureTime,
                        Train.arrivalTime
                      )}
                    </h1>
                  </div>
                  {/* //Arrival station */}
                  <div className="flex flex-col justify-between mt-1 ml-20">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Train.arrivalTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Train.arrivalStation}
                    </h2>
                  </div>
                </div>

                {/* //train details box */}
                <div className=" flex mt-3 gap-4 ml-4 mr-4">
                  {Train.trainDetails.map((detail, index) => (
                    <div
                      key={index}
                      onClick={() => handleTrainClick(Train, detail.trainNumber)}
                      className="bg-white text-black border-2 border-black shadow-xl p-1 w-44 rounded-lg cursor-pointer mb-2" // Added margin bottom for spacing
                    >
                      <div className="flex justify-between gap-5">
                        <h1 className="ml-1 mt-1 whitespace-nowrap">
                          {detail.trainClass}
                        </h1>
                        <h1 className="ml-1 mt-1">{detail.price}</h1>
                      </div>
                      <div>
                        <h4 className="text-sm text-blue-600 mt-1">
                          AVAILABLE {detail.seatsAvailable}
                        </h4>
                        <br></br>
                        Free Cancellation
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Trains are not available, Try again later</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Trains;

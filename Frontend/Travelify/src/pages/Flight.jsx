import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Flight = () => {
  const [flightDetails, setFlightDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedFrom = searchParams.get("departureStation");
  const selectedTo = searchParams.get("ArrivalStation");
  const selectedDate = searchParams.get("date");
  const selectedAdults = searchParams.get("adults");
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      console.log("Selected Airlines:", selectedAirlines); // Log selected airlines
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Flights/FlightStations",
          {
            params: {
              departureStation: selectedFrom,
              ArrivalStation: selectedTo,
              title: selectedAirlines.join(","), // Ensure selected airlines are sent correctly
            },
          }
        );
        setFlightDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching flight details:", error);
      }
    };

    // Check if selectedFrom and selectedTo are not empty before fetching
    if (selectedFrom && selectedTo) {
      fetchFlights();
    } else {
      console.log("Departure and Arrival stations must be selected.");
    }
  }, [selectedFrom, selectedTo, selectedAirlines]); // Ensure selectedAirlines is included in dependencies

  // Function to handle airline selection
  const handleAirlineChange = (airline) => {
    const { value, checked } = airline.target;
    console.log(`Checkbox changed: ${value}, Checked: ${checked}`); // Log checkbox change
    setSelectedAirlines((prev) => {
      const updatedAirlines = checked
        ? [...prev, value]
        : prev.filter((airline) => airline !== value);
      console.log("Updated Selected Airlines:", updatedAirlines); // Log updated airlines
      return updatedAirlines;
    });
  };

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

  const handleFlightClick = (flightNo) => {
    navigate(`/FlightBook/${flightNo}`, { state: { selectedAdults } });
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
        <div className="bg-slate-900 mt-3 ml-4 md:ml-64 lg:ml-4">
          <h1 className="text-black font-bold text-xl lg:text-white">
            Flights from {selectedFrom} to {selectedTo}
          </h1>
        </div>
      </div>

      {/* / //for sm screen */}
      <div className="flex flex-col md:flex-row bg-slate-400 h-full p-5 lg:hidden">
        {/* //filters box  */}
        <div className="block lg:hidden ml-1 bg-white h-4/5 mt-5 p-4 w-full">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          <h3 className="mb-4 text-black mt-4 font-bold">Filter By Airlines</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="air-india-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Air India"
                onChange={handleAirlineChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="air-india-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Air India
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="indigo-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Indigo"
                onChange={handleAirlineChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="indigo-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Indigo
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="spice-jet-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Spice Jet"
                onChange={handleAirlineChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="spice-jet-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Spice Jet
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="vistara-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Vistara"
                onChange={handleAirlineChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="vistara-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Vistara
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <input
                id="akasa-air-checkbox"
                type="checkbox"
                name="journeyClass"
                value="Akasa Air"
                onChange={handleAirlineChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="akasa-air-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Akasa Air
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-slate-400 h-screen">
        {/* //filters box  */}
        <div className="hidden lg:block ml-6 bg-white h-5/6 mt-10 p-4 w-80 md:w-64 lg:mt-[-30px] lg:w-56">
          <h1 className="text-xl font-bold">Popular Filters</h1>
          <h3 className="mb-4 text-black mt-4 font-bold">Filter By Airlines</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Air India"
                  onChange={handleAirlineChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Air India
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Indigo"
                  onChange={handleAirlineChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Indigo
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Spice Jet"
                  onChange={handleAirlineChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Spice Jet
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Vistara"
                  onChange={handleAirlineChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Vistara
                </label>
              </div>
            </li>

            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="first-ac-checkbox"
                  type="checkbox"
                  name="journeyClass"
                  value="Akasa Air"
                  onChange={handleAirlineChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="first-ac-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Akasa Air
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/* //for sm screen flightDetails box */}
        <h1 className="ml-4 text-xl font-bold mb-3 lg:hidden">
          Flight Details
        </h1>
        <div className=" bg-slate-400 h-full lg:hidden">
          <div className="border border-black rounded-md h-auto w-auto p-2 ml-4 mr-3">
            {flightDetails.length > 0 ? (
              flightDetails.map((flight) => (
                <div
                  key={flight.FlightNo}
                  className="flex gap-6 p-2 border border-white mb-8 rounded-md h-24"
                >
                  <div>
                    <h1 className="font-bold">{flight.title}</h1>
                    <h2 className="text-sm">{flight.FlightNo}</h2>
                  </div>
                  <div>
                    <h1 className="text-xl">
                      {formatTime(flight.departureTime)}
                    </h1>
                    <h2 className="text-sm">{flight.departureStation}</h2>
                  </div>
                  <div>
                    <h1 className="text-xl">
                      {formatTime(flight.ArrivalTime)}
                    </h1>
                    <h2 className="text-sm">{flight.ArrivalStation}</h2>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl">{flight.PriceStarts}</h1>
                    <h2 className="text-xs whitespace-nowrap">Per Adult</h2>

                    <div className="flex absolute justify-center items-center mt-14 right-7">
                      <button
                        onClick={() => handleFlightClick(flight.FlightNo)}
                        className="bg-sky-600 text-sm whitespace-nowrap text-white p-2 rounded-lg"
                      >
                        View All Prices
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 text-sm">
                No Flight Details Available
              </div>
            )}
          </div>
        </div>

        {/* //flightDetailsBox */}
        <div className="hidden lg:block ml-6 bg-white max-h-max mt-[-30px] p-6 w-full md:mr-5">
          {flightDetails.length > 0 ? (
            flightDetails.map((flight) => (
              <div
                key={flight.FlightNo}
                className="ml-1 mr-4 w-full h-32 border bottom-4 border-gray-600 rounded-lg mb-6"
              >
                <div className="flex flex-wrap mt-4">
                  {/* //logo image */}
                  <div className="flex justify-between w-24 h-12 ml-3 gap-1">
                    <svg id="Line_Gradient" data-name="Line Gradient" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="linear-gradient" x1="3.976" y1="32.00336" x2="60.03574" y2="32.00336" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffde00"></stop><stop offset="1" stop-color="#fd5900"></stop></linearGradient></defs><title>1</title><path class="cls-1" d="M60.03076,40.27783c.10774-1.18955-1.56054-2.18585-2.2803-2.89748a2.01934,2.01934,0,0,0-2.69675.02395l-.37579.343-1.053-2.54119c.608-.70359,2.0101-1.6916,1.88281-2.78033.09819-1.04863-1.17142-1.90447-1.79438-2.56594a2.01061,2.01061,0,0,0-2.42425-.29076L49.3573,24.907c6.61835-6.11151,6.92908-7.09839,6.99377-7.65606l1.5542-7.33643a3.92729,3.92729,0,0,0-4.35456-4.67474c-3.12737.44476-8.727,1.60687-11.08977,4.38861l-4.07807,4.69433L34.06274,12.536a2.03554,2.03554,0,0,0,.00805-2.829l-1.3452-1.39014a2.03735,2.03735,0,0,0-2.977.08012l-1.50525,1.7322-2.14136-.88568.504-.62976a2.01346,2.01346,0,0,0-.17383-2.71533l-1.376-1.33008a2.03027,2.03027,0,0,0-2.83349.02344L20.06689,6.74756l-2.36718-.979a6.12792,6.12792,0,0,0-6.43457,1.11963L9.03564,8.91113a2.02921,2.02921,0,0,0,.09575,3.07373c3.50307,2.78638,14.52675,11.55048,18.53041,14.67908L16.70148,39.28058l-6.762-3.117a4.05927,4.05927,0,0,0-4.40771.66065l-.88916.79492A2.03421,2.03421,0,0,0,4.71,40.68945l7.57339,6.19574a3.18567,3.18567,0,0,0,4.41053,4.27341l.244-.14761,5.72131,8.13061a2.018,2.018,0,0,0,1.65772.85889,2.60511,2.60511,0,0,0,1.65769-.73733,4.03783,4.03783,0,0,0,1.30275-4.90964l-3.3471-7.57459c.12788-.0968.96371-.559,1.04488-.64616.05949-.05007,5.78623-4.84566,12.24424-10.43434L51.76318,55.7002a2.03257,2.03257,0,0,0,3.24707.03022l2.49121-3.29683a6.12535,6.12535,0,0,0,.76905-6.01611L57.18658,43.8017l2.19135-2.01459A2.024,2.024,0,0,0,60.03076,40.27783Zm-7.70849-8.98095L53.502,32.46875l-.7099.72742-.7063-1.70453ZM31.28857,9.708l1.34571,1.41748-.5072.61-1.92475-.796ZM23.666,6.00586,25.044,7.36475l-.8664,1.08294-2.10168-.8692ZM10.37988,10.39209l2.229-2.02246a4.12341,4.12341,0,0,1,4.32617-.75293c1.716.70734,20.02,8.28886,20.06462,8.29827L28.97528,25.152C25.05219,22.08832,13.90125,13.22137,10.37988,10.39209ZM5.97559,39.11035l.88916-.79492A2.06233,2.06233,0,0,1,9.10254,37.98l6.47345,2.984-2.30371,4.14282ZM25.44824,55.16211a2.18683,2.18683,0,0,1-1.15339,2.82856L18.6532,49.97278l3.552-2.14978ZM23.75049,44.54932l-8.09082,4.89746A1.18217,1.18217,0,0,1,14.026,47.86712l3.80071-6.832L43.978,10.93213c2.01513-2.37256,7.5625-3.38623,9.85449-3.71192A1.91405,1.91405,0,0,1,55.9482,9.50052c-.0029.01469-1.565,7.38627-1.56733,7.39983C50.78785,21.95019,27.295,41.49973,23.75049,44.54932Zm32.15527,6.67822-2.5249,3.29687L38.7348,34.38269c2.77-2.41266,6.08435-5.32251,9.05451-8.03418l8.63354,20.8346A4.11733,4.11733,0,0,1,55.90576,51.22754Zm.46558-9.39337-.87647-2.11511.93482-.83722,1.59472,1.43261ZM47.10742,10.16162c1.8252.35108,5.29834,2.06641,5.37988,6.04736a1.00021,1.00021,0,0,1-2,.041c-.06835-3.34619-3.61084-4.09473-3.76171-4.125A1.00035,1.00035,0,0,1,47.10742,10.16162Z"></path></svg>
                    <div className="flex-col ml-2">
                      <h1 className="pt-1 font-bold">{flight.title}</h1>
                      <h2 className="pt-1 font-bold">{flight.FlightNo}</h2>
                    </div>
                  </div>
                  {/* //departure */}
                  <div className="flex flex-col justify-between mt-1 ml-20">
                    <h1 className="text-2xl font-bold">
                      {formatTime(flight.departureTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {flight.departureStation}
                    </h2>
                  </div>
                  {/* //arrow icon */}
                  <div className="ml-16 mt-4 flex-col">
                    ------------------------------------------
                    <h1 className="text-center">
                      {calculateDuration(
                        flight.departureTime,
                        flight.ArrivalTime
                      )}
                    </h1>
                  </div>
                  {/* //Arrival station */}
                  <div className="flex flex-col justify-between mt-1 ml-20">
                    <h1 className="text-2xl font-bold">
                      {formatTime(flight.ArrivalTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {flight.ArrivalStation}
                    </h2>
                  </div>
                  {/* //price */}
                  <div className="ml-16 mt-2 gap-2">
                    <h1 className="font-bold text-xl">{flight.PriceStarts}</h1>
                    <h2 className="font-semibold">Per Adult</h2>
                  </div>
                  {/* view all prices */}
                </div>
                <div className="flex justify-end mt-3 mr-3">
                  <button
                    onClick={() => handleFlightClick(flight.FlightNo)}
                    className="bg-sky-600 text-bold text-white p-2 rounded-lg"
                  >
                    View All Prices
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Flights are not available, Try again later</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Flight;

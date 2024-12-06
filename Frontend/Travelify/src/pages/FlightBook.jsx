import React, { useState, useEffect,useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from 'react-lottie'; // Import Lottie for animation
import animationData from '../Animations/Flight.json'; 
import { AuthContext } from "../components/AuthContext";

const FlightBook = () => {
  const [flightInfo, setFlightInfo] = useState(false);
  const { id } = useParams();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const location = useLocation();
  const { selectedAdults } = location.state || {};
  const [travelerDetails, setTravelerDetails] = useState([]);
  const { isAuthenticated, userId } = useContext(AuthContext); // Ensure userId is used
  const [newTraveler, setNewTraveler] = useState({
    name: "",
    age: "",
    gender: "",
    nationality: "",
    berthPreference: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // New state for animation visibility

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/FlightBookings/FlightInfo/${id}`
        );
        setFlightInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, [id]);

  const handleClassSelection = (className, price) => {
    setSelectedClass(className);
    setSelectedPrice(price);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const Totalprice = selectedAdults * selectedPrice;

  const FlightBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/FlightBookings/FlightBook/${id}`,
        {
          title: flightInfo.title,
          FlightNo: flightInfo.FlightNo,
          DepartureStation: flightInfo.departureStation,
          ArrivalStation: flightInfo.ArrivalStation,
          departureTime: flightInfo.departureTime,
          ArrivalTime: flightInfo.ArrivalTime,
          Price: selectedPrice,
          TravellerDetails: travelerDetails,
          SelectedClass: selectedClass,
          SelectedAdults: Number(selectedAdults),
          TotalPrice: Totalprice,
        }
      );
      setShowAnimation(true); // Show animation
      setTimeout(() => {
        toast.success("Flight booked successfully");
        setShowAnimation(false); // Hide animation after showing message
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book flight");
    }
  };

  const handleAddTraveler = () => {
    if (
      newTraveler.name &&
      newTraveler.age &&
      newTraveler.gender &&
      newTraveler.nationality &&
      newTraveler.berthPreference
    ) {
      setTravelerDetails([...travelerDetails, newTraveler]);
      setNewTraveler({
        name: "",
        age: "",
        gender: "",
        nationality: "",
        berthPreference: "",
      });
      setShowPopup(false);
    } else {
      toast.error("Please fill all fields correctly."); // Error handling added
    }
  };

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
      
      {flightInfo ? (
        <div className="bg-slate-950 w-full h-20">
          <h1 className="text-white text-3xl font-bold ml-3 pt-4">
            Review Your Booking
          </h1>
          <div className="flex gap-04 flex-col lg:flex-row lg:gap-20">
            {/* //box1 */}
            <div className="bg-white border-gray-500 border-2 h-3/4 mt-4 w-4/5 ml-6 rounded-lg shadow-lg shadow-blue-800 lg:w-2/3 lg:mt-3">
              {/* //title with photo
              //description
              //Category
              //check in check out date box
              //Important Information */}
              <div className="ml-3 mt-3 mb-2">
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <h1 className="text-xl font-bold">{flightInfo.title}</h1>
                    <p className="text-xl font-bold">({flightInfo.FlightNo})</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Deaparture Time:</h1>
                  <p className="text-lg">
                    {formatTime(flightInfo.departureTime)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Arrival Time</h1>
                  <p className="text-lg">
                    {formatTime(flightInfo.ArrivalTime)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Deaparture Station</h1>
                  <p className="text-lg">{flightInfo.departureStation}</p>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Arrival Station</h1>
                  <p className="text-lg">{flightInfo.ArrivalStation}</p>
                </div>

                <div className="mt-4">
                  <h1 className="text-xl font-semibold">Select a Class</h1>
                  <div className="flex-col justify-start flex gap-3 place-items-start mt-2 lg:flex-row">
                    <button
                      className={`bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        selectedClass === "Economy"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={() =>
                        handleClassSelection(
                          "Economy",
                          flightInfo.class.EconomyPrice
                        )
                      }
                    >
                      Economy - {flightInfo.class.EconomyPrice}
                    </button>
                    <button
                      className={`bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        selectedClass === "Business"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={() =>
                        handleClassSelection(
                          "Business",
                          flightInfo.class.BusinessPrice
                        )
                      }
                    >
                      Business - {flightInfo.class.BusinessPrice}
                    </button>
                    <button
                      className={`bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        selectedClass === "Premium Economy"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={() =>
                        handleClassSelection(
                          "Premium Economy",
                          flightInfo.class.PremiumEconomy
                        )
                      }
                    >
                      Premium Economy - {flightInfo.class.PremiumEconomy}
                    </button>
                    <button
                      className={`bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        selectedClass === "First Class"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={() =>
                        handleClassSelection(
                          "First Class",
                          flightInfo.class.FirstClass
                        )
                      }
                    >
                      First Class - {flightInfo.class.FirstClass}
                    </button>
                  </div>
                </div>

                <div className="gap-4 mt-3">
                  <h1 className="text-2xl font-bold">Important Information</h1>
                  <ul className="list-disc ml-5 mt-1">
                    <li>Cabin Baggage:7 Kgs (1 piece only) / Adult</li>
                    <li>Check-In Baggage:15 Kgs (1 piece only) / Adult</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* //box2 */}
            <div className="bg-white border-gray-500 border-2 mt-3 w-4/5 ml-6 lg:w-80 lg:ml-0  lg:mr-10 shadow-lg shadow-blue-800 rounded-lg p-1">
              <h1 className="font-bold ml-3 text-xl"> Price Breakup</h1>
              <div className="p-1">
                <div className="flex justify-between ml-1 mr-2 mt-1"> 
                  <h2>Selected Base Fare</h2>
                  <h1 className="ml-1">{selectedPrice}</h1>
                </div>
                <div className="flex justify-between ml-1 mr-2 mt-1">
                  <h2>Selected Class</h2>
                  <h1 className="ml-1">{selectedClass}</h1>
                </div>
                <div className="flex justify-between ml-1 mr-2 mt-1">
                  <h2>Selected Adults</h2>
                  <h1 className="ml-1">{selectedAdults}</h1>{" "}
                  {/* Display selectedAdults */}
                </div>
                <div className="flex justify-between mr-2 mt-2 bg-gray-700 p-2 text-white w-full rounded-lg">
                  <h2 className="font-semibold">Total Price</h2>
                  <div className="flex justify-end">
                    <h2 className="font-semibold">{Totalprice}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //box3 */}
          {/* Traveller details */}
          <div className="border-x-8 shadow-md border mt-5 ml-5 mr-3 border-3 w-5/6 text-black p-3 lg:w-1/2 lg:ml-6">
            <h1 className="text-xl text-blue-900">Traveller Details</h1> (add
            the selected adults information or add more travellers to see total
            price )
            <div className="mt-3">
              {travelerDetails.map((traveler, index) => (
                <div key={index} className="mt-2">
                  <div>
                    <h1 className="font-bold text-xl">
                      {traveler.name} ({traveler.gender})
                    </h1>
                  </div>
                  <div className="flex">
                    <h1 className="text-md">
                      {traveler.nationality}, {traveler.age},{" "}
                      {traveler.berthPreference}
                    </h1>
                  </div>
                </div>
              ))}
              <button
                className="bg-blue-500 text-white p-2 rounded-lg mt-3"
                onClick={() => setShowPopup(true)}
              >
                Add Traveler
              </button>
            </div>
          </div>
          {showPopup && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-3">
              <div className="bg-white p-5 rounded-lg w-96">
                <h2 className="text-xl mb-4">Add Traveller</h2>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Name (Enter Full Name)"
                    value={newTraveler.name}
                    onChange={(e) =>
                      setNewTraveler({ ...newTraveler, name: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={newTraveler.age}
                    onChange={(e) =>
                      setNewTraveler({ ...newTraveler, age: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  />
                  <select
                    value={newTraveler.gender}
                    onChange={(e) =>
                      setNewTraveler({
                        ...newTraveler,
                        gender: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    value={newTraveler.nationality}
                    onChange={(e) =>
                      setNewTraveler({
                        ...newTraveler,
                        nationality: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Nationality</option>
                    <option value="ind">IND</option>
                    <option value="aus">AUS</option>
                    <option value="us">US</option>
                  </select>
                  <select
                    value={newTraveler.berthPreference}
                    onChange={(e) =>
                      setNewTraveler({
                        ...newTraveler,
                        berthPreference: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Berth Preference</option>
                    <option value="Window">Window</option>
                    <option value="Non-Window">Non-Window</option>
                  </select>
                </div>
                <button
                  className="bg-green-500 text-white p-2 rounded-lg mt-3"
                  onClick={handleAddTraveler}
                >
                  Add
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg mt-3 ml-2"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showAnimation && ( // Conditional rendering for animation
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
              <Lottie options={{ animationData, loop: false }} height={400} width={400} />
            </div>
          )}
          {/* //button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={FlightBooking}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-5"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
    ):(
      <h1 className="text-2xl ml-3 mt-3 font-bold text-center">Login first to book a flight</h1>
    )}
    </>
  );
};

export default FlightBook;

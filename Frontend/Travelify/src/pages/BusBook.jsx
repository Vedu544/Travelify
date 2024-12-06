import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../Animations/Bus.json";
import { AuthContext } from "../components/AuthContext";
const BusBook = () => {
  const [Bus, getBus] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const [selectedAdults, setSelectedAdults] = useState(
    location.state?.selectedAdults || 0
  );
  const { isAuthenticated, userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/BusBookings/getBus/${id}`
        );
        getBus(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBus();
  }, [id]);

  const bookBus = async () => {
    try {
      console.log("Booking Bus with ID:", id);
      const response = await axios.post(
        `http://localhost:3000/api/BusBookings/bookBus/${id}`,
        {
          title: Bus.title,
          BusNo: Bus.BusNo,
          departureStation: Bus.departureStation,
          ArrivalStation: Bus.ArrivalStation,
          departureTime: Bus.departureTime,
          ArrivalTime: Bus.ArrivalTime,
          Price: Bus.Price,
          SeatsAvailable: Bus.SeatsAvailable,
          TravellerDetails: travelerDetails,
          PickupPoint: Bus.PickupPoint,
          DropPoint: Bus.DropPoint,
          BusType: Bus.BusType,
        }
      );
      console.log(response.data);
      setShowAnimation(true); // Show animation
      setTimeout(() => {
        toast.success("bus ticket booked successfully");
        setShowAnimation(false); // Hide animation after showing message
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book bus ticket");
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const calculateDuration = (departureTime, ArrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(ArrivalTime);
    const durationInMinutes = (arrival - departure) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [travelerDetails, setTravelerDetails] = useState([]);
  const [newTraveler, setNewTraveler] = useState({
    name: "",
    age: "",
    gender: "",
    nationality: "",
    berthPreference: "",
  });

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
      if (travelerDetails.length + 1 > selectedAdults) {
        setSelectedAdults(travelerDetails.length + 1);
      }
    } else {
      toast.error("Please fill all fields correctly."); // Error handling added
    }
  };

  const totalPrice = () => {
    let classPrice = 0;
    if (selectedClass === "Two Seater") {
      classPrice = Bus.Price?.class?.secondSeating || 0; // Get price for Second Seating
    } else if (selectedClass === "Sleeper Class") {
      classPrice = Bus.Price?.class?.sleeperClass || 0; // Get price for Sleeper Class
    } else {
      classPrice = Bus.price || 0; // Default price if no class is selected
    }
    return classPrice * travelerDetails.length; // Calculate total price
  };

  const [selectedClass, setSelectedClass] = useState(""); // New state for selected class

  const handleSelectClass = (className) => {
    setSelectedClass(className); // Update selected class
  };

  const [showAnimation, setShowAnimation] = useState(false); // New state for animation visibility

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          {/* <ToastContainer /> */}
          {Bus ? (
            <div className="flex flex-col lg:flex-row">
              {/* //1st box - Bus details */}
              <div className="border-x-8 border mt-3 ml-3 mr-3 border-3 w-auto lg:w-2/3 text-black p-3">
                <h1 className="text-xl text-blue-900">Selected Bus Details</h1>
                <div className="flex mt-3 flex-col lg:flex-row">
                  <div>
                    <h1 className="text-2xl font-bold whitespace-nowrap">
                      {Bus.name}
                    </h1>
                    <h3 className="text-2xl font-semibold">{Bus.BusNo}</h3>
                    <h2 className="text-sm  whitespace-nowrap font-semibold">
                      {Bus.BusType}
                    </h2>
                  </div>
                  {/* //departure */}
                  <div className="flex flex-col justify-between mt-4 lg:mt-2 ml-2 lg:ml-24">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Bus.departureTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Bus.departureStation}
                    </h2>
                    <h4 className="text-base">{Bus.PickupPoint}</h4>
                  </div>
                  {/* //arrow icon */}
                  <div className="ml-1 mt-4 flex-col  lg:ml-8">
                    ---------------------------------------
                    <h1 className="text-center">
                      {calculateDuration(Bus.departureTime, Bus.ArrivalTime)}
                    </h1>
                  </div>
                  {/* //Arrival station */}
                  <div className="flex flex-col justify-between mt-1 ml-1 lg:ml-14">
                    <h1 className="text-2xl font-bold">
                      {formatTime(Bus.ArrivalTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {Bus.ArrivalStation}
                    </h2>
                    <h4 className="text-base">{Bus.DropPoint}</h4>
                  </div>
                </div>
                <div className="flex mt-5 gap-16 lg:gap-20">
                  <h1 className="text-lg whitespace-nowrap lg:text-xl lg:font-bold">
                    Availability Status
                  </h1>
                  <h1 className="text-lg hidden lg:block whitespace-nowrap lg:text-xl lg:font-bold">
                    Select Class
                  </h1>
                </div>

                <div className="flex-col flex mt-2 gap-6 lg:gap-10 lg:flex-row">
                  <div className="border-gray-800 border-2 w-52 rounded-md p-3">
                    <div className="flex gap-3">
                      <h1 className="text-blue-700 whitespace-nowrap">
                        AVAILABLE - {Bus.SeatsAvailable}
                      </h1>
                    </div>
                  </div>

                  <div className="text-lg lg:font-hidden lg:hidden">
                    Select a Class
                  </div>

                  <div
                    className={`border-2 w-44 rounded-md p-3 cursor-pointer ${
                      selectedClass === "Two Seater"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      borderColor:
                        selectedClass === "Two Seater" ? "black" : "gray",
                    }}
                    onClick={() => {
                      handleSelectClass("Two Seater");
                    }}
                  >
                    {Bus.Price && Bus.Price.class && (
                      <div className="flex gap-3">
                        <h1 className="text-blue-700 text-md whitespace-nowrap">
                          Two Seater -{" "}
                          {Bus.Price.class["secondSeating "] !== undefined
                            ? Bus.Price.class["secondSeating "]
                            : "N/A"}
                        </h1>
                      </div>
                    )}
                  </div>

                  <div
                    className={`border-2 w-44 rounded-md p-3 cursor-pointer ${
                      selectedClass === "Sleeper Class"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      borderColor:
                        selectedClass === "Sleeper Class" ? "black" : "gray",
                    }}
                    onClick={() => {
                      handleSelectClass("Sleeper Class");
                      // console.log("Selected Class:", "Sleeper Class");
                    }}
                  >
                    <div className="flex gap-3">
                      <h1 className="text-blue-700 whitespace-nowrap">
                        Sleeper Class -{" "}
                        {Bus.Price ? Bus.Price.class.sleeperClass : "N/A"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* //2nd box - Price */}
              <div className="border-blue-200 shadow-md border mt-3 ml-3 mr-3 border-3 w-auto lg:w-80 text-black p-3">
                <h1 className="text-center text-xl text-blue-900">
                  Price Breakup
                </h1>

                <div className="flex mt-5 justify-between">
                  <h1 className="font-bold">Selected Bus Class</h1>
                  <h1 className="font-semibold">{selectedClass || "N/A"}</h1>
                </div>

                <div className="flex mt-1 justify-between">
                  <h1 className="font-bold">Selected Adults</h1>
                  <h1 className="font-semibold">{selectedAdults}</h1>{" "}
                  {/* Display selectedAdults */}
                </div>

                <div className="flex mt-1 justify-between">
                  <h1 className="font-bold">Base Fare Price</h1>
                  <h1 className="font-semibold">
                    {(() => {
                      console.log("Current Selected Class:", selectedClass); // Log selected class
                      console.log("Bus Object:", Bus); // Log Bus object for structure

                      // Check if Bus and its Price structure are defined
                      if (Bus && Bus.Price && Bus.Price.class) {
                        if (selectedClass === "Two Seater") {
                          return Bus.Price.class.secondSeating !== undefined
                            ? Bus.Price.class.secondSeating
                            : "N/A";
                        } else if (selectedClass === "Sleeper Class") {
                          return Bus.Price.class.sleeperClass !== undefined
                            ? Bus.Price.class.sleeperClass
                            : "N/A";
                        }
                      }
                      return Bus.price !== undefined ? Bus.price : "N/A"; // Default price
                    })()}
                  </h1>
                </div>

                <div className="flex mt-4 justify-between text-white bg-blue-600 rounded-md p-2">
                  <h1 className="font-bold">Total Price</h1>
                  <h1 className="font-semibold">{totalPrice()}</h1>{" "}
                  {/* Call the totalPrice function */}
                </div>

                <div className="mt-5 flex justify-center items-center">
                  <button
                    onClick={bookBus}
                    className="bg-slate-900 text-white p-2 rounded-lg"
                  >
                    Pay & Book Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
          {/* Traveler Details Box */}
          <div className="border-x-8 shadow-md border mt-3 ml-3 mr-3 border-3 w-auto lg:w-2/3 text-black p-3">
            <h1 className="text-xl text-blue-900">Traveller Details</h1> (add a
            selected adults or more adults info to see total price)
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
                Add Traveller
              </button>
            </div>
          </div>

          {/* Popup for adding traveler details */}
          {showPopup && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
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
                      setNewTraveler({ ...newTraveler, gender: e.target.value })
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
                    <option value="IND">IND</option>
                    <option value="AUS">AUS</option>
                    <option value="US">US</option>
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
              <Lottie
                options={{ animationData, loop: false }}
                height={400}
                width={400}
              />
            </div>
          )}
        </>
      ) : (
        <h1 className="text-2xl ml-3 mt-3 font-bold text-center">
          Login first to book a Bus
        </h1>
      )}
    </>
  );
};

export default BusBook;

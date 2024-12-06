import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../Animations/Train.json";
import { AuthContext } from "../components/AuthContext";

const TrainBook = () => {
  const [train, getTrain] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  console.log(location.state); // Check if seatsAvailable is present
  const { trainClass, price, seatsAvailable, selectedAdults , setSelectedAdults } =
    location.state || {};
  const { isAuthenticated, userId } = useContext(AuthContext);
  
  

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/TrainBookings/getTrain/${id}`
        );
        getTrain(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrains();
  }, [id]);

  const [showAnimation, setShowAnimation] = useState(false); // Add state for animation visibility

  const bookTrain = async () => {
    try {
      const bookingDetails = {
        name: train.name,
        trainNo: train.trainNo,
        trainDetails: {
          trainNumber: train.trainNo,
          trainClass: trainClass,
          price: Number(price),
          seatsAvailable: Number(seatsAvailable)
        },
        departureStation: train.departureStation,
        arrivalStation: train.arrivalStation,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        Travellerdetails: travelerDetails,
        Totalprice: totalPrice,
        TotalAdults: travelerDetails.length,
        SelectedAdults: selectedAdults,
        SelectedTrainClass: trainClass,
      };

      // console.log("Booking Details:", bookingDetails); // Log the booking details

      const response = await axios.post(
        `http://localhost:3000/api/TrainBookings/bookTrainTicket/${id}`,
        bookingDetails
      );
      console.log(response.data);
      setShowAnimation(true); // Show animation on success
      setTimeout(() => {
        toast.success("Train ticket booked successfully");
        setShowAnimation(false); // Hide animation after 3 seconds
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book train ticket");
    }
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

  const totalPrice = price * travelerDetails.length; // Update totalPrice calculation

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          {/* <ToastContainer /> */}
          {train ? (
            <div className="flex-col flex lg:flex-row">
              {/* //1st box - Train details */}
              <div className="border-x-8 border mt-3 ml-3 mr-3 border-3 w-auto lg:w-2/3 text-black p-3">
                <h1 className="text-xl text-blue-900">
                  Selected Train Details
                </h1>
                <div className="flex mt-3 flex-col lg:flex-row">
                  <div>
                    <h1 className="text-2xl font-bold whitespace-nowrap">
                      {train.name}
                    </h1>
                    <h3 className="text-sm font-semibold">{train.trainNo}</h3>
                  </div>
                  {/* //departure */}
                  <div className="flex flex-col justify-between mt-4 lg:mt-2 ml-2 lg:ml-24">
                    <h1 className="text-2xl font-bold">
                      {formatTime(train.departureTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {train.departureStation}
                    </h2>
                  </div>
                  {/* //arrow icon */}
                  <div className="ml-1 mt-4 flex-col  lg:ml-8">
                    ---------------------------------------
                    <h1 className="text-center">
                      {calculateDuration(
                        train.departureTime,
                        train.arrivalTime
                      )}
                    </h1>
                  </div>
                  {/* //Arrival station */}
                  <div className="flex flex-col justify-between mt-1 ml-1 lg:ml-14">
                    <h1 className="text-2xl font-bold">
                      {formatTime(train.arrivalTime)}
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {train.arrivalStation}
                    </h2>
                  </div>
                </div>

                <div className="flex mt-5 gap-16 lg:gap-20">
                  <h1 className="text-lg whitespace-nowrap lg:text-xl lg:font-bold">
                    Availability Status
                  </h1>
                  <h1 className="text-lg hidden lg:block whitespace-nowrap lg:text-xl lg:font-bold">
                    Your Boarding Station
                  </h1>
                </div>
                <div className="flex-col flex mt-2 gap-6 lg:gap-10 lg:flex-row">
                  <div className="border-gray-800 border-2 w-56 rounded-md p-3">
                    <div className="flex gap-3 whitespace-nowrap">
                      {trainClass}
                      <h1 className="text-blue-700 whitespace-nowrap">
                        AVAILABLE - {seatsAvailable}
                      </h1>
                    </div>
                  </div>

                  <div className="text-lg lg:font-hidden lg:hidden">
                    Your Boarding Station
                  </div>

                  <div className="border-gray-800 border-2 w-52 rounded-md p-3">
                    Bengaluru
                  </div>
                </div>
              </div>
              {/* //2nd box - Price */}
              <div className="border-blue-200 shadow-md border mt-3 ml-3 mr-3 border-3 w-auto lg:w-80 text-black p-3">
                <h1 className="text-center text-xl text-blue-900">
                  Price Breakup
                </h1>

                <div className="flex mt-5 justify-between">
                  <h1 className="font-bold">Selected Train Class</h1>
                  <h1 className="font-semibold ">{trainClass}</h1>
                </div>

                <div className="flex mt-1 justify-between">
                  <h1 className="font-bold">Selected Adults</h1>
                  <h1 className="font-semibold">
                    {travelerDetails.length > selectedAdults
                      ? Number(selectedAdults) +
                        (travelerDetails.length - selectedAdults)
                      : selectedAdults}
                  </h1>
                </div>

                <div className="flex mt-1 justify-between">
                  <h1 className="font-bold">Base Fare Price</h1>
                  <h1 className="font-semibold">{price}</h1>
                </div>

                <div className="flex mt-4 justify-between text-white bg-blue-600 rounded-md p-2">
                  <h1 className="font-bold">Total Price</h1>
                  <h1 className="font-semibold">{totalPrice}</h1>
                </div>

                <div className="mt-5 flex justify-center items-center">
                  <button
                    onClick={bookTrain}
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
                    <option value="Lower">Lower</option>
                    <option value="Upper">Upper</option>
                    <option value="Middle">Middle</option>
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
          Login first to book a Train
        </h1>
      )}
    </>
  );
};

export default TrainBook;

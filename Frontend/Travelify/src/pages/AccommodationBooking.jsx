import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../Animations/property.json";

const AccommodationBooking = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showAnimation, setShowAnimation] = useState(false); // New state for animation visibility

  useEffect(() => {
    const getAccommodation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties/getProperty/${id}`
        );
        setAccommodation(response.data);
      } catch (error) {
        toast.error("Error getting Accommodation: " + error.message);
      }
    };
    getAccommodation();
  }, [id]);

  const AccommodationBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/bookings/PropertyBookings/${id}`,
        {
          checkInDate: checkIn, // Change to checkInDate
          checkOutDate: checkOut, // Change to checkOutDate
          name: username, // Change to name
          email: email,
          phone: phoneNumber, // Change to phone
          totalPrice: totalPrice,
          address: accommodation.address, // Ensure address is included
          photos: accommodation.photos, // Ensure photos are included
        }
      );
      // Preserve the photos property
      setAccommodation((prevAccommodation) => ({
        ...prevAccommodation,
        ...response.data,
      }));
      setShowAnimation(true); // Show animation
      setTimeout(() => {
        toast.success("Accomodation booked successfully");
        setShowAnimation(false); // Hide animation after showing message
      }, 3000);
      console.log("Room booked successfully:", response.data);
    } catch (error) {
      toast.error("Accommodation is not available for this dates ");
      console.log("Error booking Accommodation:", error.message);
    }
  };

  const handleCheckOutChange = (e) => {
    const selectedCheckOut = e.target.value;
    setCheckOut(selectedCheckOut);
    if (checkIn) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(selectedCheckOut);
      const timeDiff = checkOutDate - checkInDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setTotalDays(daysDiff);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const handleCheckInChange = (e) => {
    const selectedCheckIn = e.target.value;
    setCheckIn(selectedCheckIn);
    if (checkOut && new Date(checkOut) <= new Date(selectedCheckIn)) {
      setCheckOut("");
      setTotalDays(0);
    }
  };

  const calculateTotalPrice = () => {
    if (accommodation) {
      const price = accommodation.price * totalDays;
      setTotalPrice(price);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [totalDays, accommodation]); // Recalculate price when these change

  return (
    <>
      <Navbar />
      {accommodation ? (
        <div className="bg-slate-950 w-full h-20">
          <h1 className="text-white text-3xl font-bold ml-3 pt-4">
            Review Your Booking
          </h1>
          <div className="flex gap-20">
            {/* //box1 */}
            <div className="bg-white border-gray-500 border-2 h-3/4 mt-3 w-2/3 ml-6 rounded-lg shadow-lg shadow-blue-800">
              {/* //title with photo
          //description
          //Category
          //check in check out date box
          //Important Information */}
              <div className="ml-3 mt-3 mb-2">
                <div className="flex gap-4">
                  <img
                    className="h-25 w-40 rounded-sm"
                    src={accommodation.photos[0]}
                    alt="accommodation"
                  />
                  <div>
                    <h1 className="text-xl font-bold">{accommodation.title}</h1>
                    <p>{accommodation.description}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Address</h1>
                  <p className="text-lg">{accommodation.address}</p>
                </div>
                <div className="flex gap-4">
                  <label className="text-xl font-semibold">
                    Check-In Date:
                  </label>
                  <input
                    type="date"
                    className="text-lg"
                    min={today}
                    value={checkIn}
                    onChange={handleCheckInChange}
                  />
                </div>
                <div className="flex gap-4">
                  <label className="text-xl font-semibold">
                    Check-Out Date:
                  </label>
                  <input
                    type="date"
                    className="text-lg"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={handleCheckOutChange}
                  />
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Max Guests</h1>
                  <p className="text-lg">{accommodation.maxGuests}</p>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-xl font-semibold">Price Per Night</h1>
                  <p className="text-lg">{accommodation.price}</p>
                </div>
                <div className="gap-4 mt-3">
                  <h1 className="text-2xl font-bold">Important Information</h1>
                  <ul className="list-disc ml-5 mt-1">
                    <li>
                      Room With Free Cancellation Available only before 24hrs
                      from CheckIn date
                    </li>
                    <li>
                      Aadhar, Driving License and Govt. ID are accepted as ID
                      proof(s)
                    </li>
                    <li>Pets are not Allowed</li>
                    <li>Outside food is not allowed</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* //box2 */}
            <div className="bg-white border-gray-500 border-2 mt-3 w-1/6 shadow-lg shadow-blue-800 rounded-lg p-1">
              <h1 className="font-bold ml-3 text-xl"> Price Breakup</h1>
              <div className="p-1">
                <div className="flex justify-between ml-4 mr-4 mt-3">
                  <h2>Check In</h2>
                  <h1 className="ml-1">{checkIn}</h1>
                </div>
                <div className="flex justify-between ml-4 mr-4 mt-1">
                  <h2>Check Out</h2>
                  <h1 className="ml-1">{checkOut}</h1>
                </div>
                <div className="flex justify-between ml-4 mr-4 mt-1">
                  <h2>Total Days</h2>
                  <h1 className="ml-1">{totalDays}</h1>
                </div>
                <div className="flex justify-between ml-4 mr-4 mt-1">
                  <h2>Guests</h2>
                  <h1 className="ml-1">2</h1>
                </div>
                <div className="flex justify-between ml-4 mr-4 mt-1">
                  <h2>Room Price</h2>
                  <h1 className="ml-1">
                    {accommodation ? accommodation.price : "Loading..."}
                  </h1>
                </div>
                <div className="flex justify-between mr-4 mt-2 bg-gray-700 p-2 text-white w-full rounded-lg">
                  <h2 className="font-semibold">Total Price </h2>
                  <h1 className="font-bold">{totalPrice}</h1>
                </div>
              </div>
            </div>
          </div>
          {/* //box3 */}
          {/* Traveller details */}
          <div className="bg-white border-gray-500 border-2 mt-6 ml-6 w-3/4 shadow-lg shadow-blue-800 rounded-lg p-3 mb-5">
            <h1 className="font-bold ml-3 text-2xl">Traveller Details</h1>
            <div className="my-2 ml-3">
              <label
                htmlFor="username"
                className="block text-md text-black font-bold "
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-2 ml-3">
              <label
                htmlFor="email"
                className="block text-md text-black font-bold "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2 ml-3">
              <label
                htmlFor="phoneNumber"
                className="block text-md text-black font-bold "
              >
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          {/* //button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={AccommodationBooking}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-5"
            >
              Confirm Booking
            </button>
            {showAnimation && ( // Conditional rendering for animation
              <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
                <Lottie
                  options={{ animationData, loop: false }}
                  height={400}
                  width={400}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default AccommodationBooking;

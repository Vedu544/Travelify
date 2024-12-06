import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1); // New state for max guests
  const [days, setDays] = useState(1); // New state for days
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price

  const calculateTotalPrice = () => {
    if (room) {
      const price = room.price * maxGuests * days;
      setTotalPrice(price);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [maxGuests, days, room]); // Recalculate price when these change

  const today = new Date().toISOString().split("T")[0];

  const handleCheckInChange = (e) => {
    const selectedCheckIn = e.target.value;
    setCheckIn(selectedCheckIn);
    if (checkIn && new Date(checkOut <= new Date(selectedCheckIn))) {
      setCheckOut("");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/rooms/rooms/${id}`
        );
        setRoom(response.data);
        console.log("Room fetched successfully:", response.data);
      } catch (error) {
        console.log("Error fetching room:", error.message);
      }
    };
    fetchRoom();
  }, [id]);

  const bookingRoom = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/rooms/bookRoom/${id}`,
        {
          checkIn: checkIn,
          checkOut: checkOut,
          maxGuests: maxGuests, // Include max guests in the booking data
          days: days // Include days in the booking data
        }
      );
      setRoom(response.data);
      toast.success("Room booked successfully!");
      console.log("Room booked successfully:", response.data);
    } catch (error) {
      toast.error("Room is already booked on that dates");
      console.log("Error booking room:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        {room ? (
          <div className="bg-slate-950 text-white p-4 w-1/2 mx-auto border-2 border-green-200 flex-row mt-20 justify-center items-center" >
            <h1 className="font-bold text-2xl">Confirm Booking</h1>
            <h1 className="mt-4">Title: {room.title}</h1>
            <p>Price per Night: {room.price}</p>
            <p>Max People: {room.maxPeople}</p>
            <p>Category: {room.category}</p>
            <p>Description: {room.desc}</p>
            <ul>
              {room.roomNumbers && room.roomNumbers.map((roomNumber, index) => (
                <li key={index}>Number: {roomNumber.number}</li>
              ))}
            </ul>
            <div>
              <label>Number of Adults:</label>
              <input 
                type="number" 
                value={maxGuests} 
                onChange={(e) => {
                  const value = Math.min(5, Math.max(1, e.target.value)); // Limit maxGuests between 1 and 5
                  setMaxGuests(value);
                }} 
                className="text-black p-1 ml-2"
              />
            </div>
            <div>
              <label>Number of Days:</label>
              <input 
                type="number" 
                value={days} 
                onChange={(e) => {
                  const value = Math.min(7, Math.max(1, e.target.value)); // Limit days between 1 and 7
                  setDays(value);
                }} 
                className="text-black p-1 ml-2 mt-3"
              />
            </div>
            <div>
              <label>Check-In Date:</label>
              <input type="date" 
              className="text-black p-1 ml-4 mt-2"
              min = {today}
              value={checkIn}
              onChange={handleCheckInChange} />
            </div>
            <div>
              <label>Check-Out Date:</label>
              <input type="date"
              className="text-black p-1 ml-2 mt-2"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div>
              <p>Total Price: {totalPrice}</p> {/* Display total price */}
            </div>
            <button
              onClick={bookingRoom}
              className="text-2xl bg-blue-600 text-white p-2 mt-7 rounded-lg flex items-center"
            >
              Book Now
            </button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Room;

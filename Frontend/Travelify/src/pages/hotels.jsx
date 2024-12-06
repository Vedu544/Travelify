import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hotels = () => { // Renamed to Hotels
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/hotels/gethotels"
        );
        setHotels(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHotels();
  }, []);

  const handleHotelClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 ml-3 mr-3 pt-5">
          {hotels.map((hotel) => (
            <div
              className="p-2 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col cursor-pointer mb-10 md:p-3 lg:p-3"
              key={hotel._id}
            >
              <img
                src={hotel.photos[0]}
                className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                alt={hotel.title}
              />
              <div className="mt-4 flex flex-col items-start w-full">
                {" "}
                {/* Changed to flex-col and items-start */}
                <h4 className="font-bold text-xl whitespace-nowrap">{hotel.title}</h4>
                <p className="mt-2 text-xl font-semibold text-black">
                  {hotel.City}
                </p>
                <button
                  type="button"
                  onClick={() => handleHotelClick(hotel._id)}
                  className="mt-2 rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900"
                >
                  Experience Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hotels; // Renamed to Hotels

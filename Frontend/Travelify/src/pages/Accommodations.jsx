import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/properties/getAllProperties"
        );
        setAccommodations(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAccommodations();
  }, []);

  return (
    <>
      <Navbar />
      <div class="bg-white h-screen">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-9 mt-4 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          <h1 class="text-3xl font-bold text-black ml-2 mt-5">Accomendations</h1>
        </div>
        <p class="text-xl text-black ml-2 mt-1">
          Discover unique stays, owned by locals, for your unforgettable journey
          🌟
        </p>

        {/* //accomendation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 ml-3 p-4">
          {accommodations.map((item) => (
            <div
              className="p-4 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center cursor-pointer mb-10"
              key={item.id}
            >
              {" "}
          
              <img
                src={item.photos}
                className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                alt={item.title}
              />
              <div className="mt-3 flex justify-start md:flex-none lg:flex-col">
                <h4 className="font-bold text-xl">{item.title}</h4>
                <p className="mt-2 text-gray-600">{item.City}</p>
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex rounded-md whitespace-nowrap border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm"
                  >
                    Check Out Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accommodations;

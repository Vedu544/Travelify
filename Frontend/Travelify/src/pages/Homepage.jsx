import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie"; // Import Lottie
import animationData from "../Animations/Travel.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../components/CitiesData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

const Homepage = () => {
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Always reset localStorage for the popup key
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true); // Show the popup for the first visit in this session
      sessionStorage.setItem("hasSeenPopup", "true"); // Mark popup as shown
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [fromCities] = useState([
    { name: "Mumbai" },
    { name: "Ahmedabad" },
    { name: "Pune" },
    { name: "Jaipur" },
    { name: "Delhi" },
    { name: "Chennai" },
    { name: "Kolkata" },
  ]);
  const [toCities] = useState([
    { name: "Pune" },
    { name: "Ahmedabad" },
    { name: "Mumbai" },
    { name: "Jaipur" },
    { name: "Delhi" },
    { name: "Chennai" },
    { name: "Kolkata" },
  ]);

  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [selectedMode, setSelectedMode] = useState(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });

  const [showAnimation, setShowAnimation] = useState(true); // State to control animation visibility

  const filteredFromCities = fromCities.filter(
    (city) => city.name !== selectedTo
  );
  const filteredToCities = toCities.filter(
    (city) => city.name !== selectedFrom
  );

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const citiesPerSlide = () => {
    const totalCities = data.length; // Get total number of cities
    if (totalCities <= 3) return totalCities; // Show all cities if less than or equal to 3
    if (window.innerWidth < 640) {
      // Mobile screens
      return 1; // Show 1 city per slide
    } else if (window.innerWidth < 768) {
      // Small tablets
      return 2; // Show 2 cities per slide
    } else {
      return 2; // Show 3 cities per slide for larger screens
    }
  };

  // Calculate the maximum index to prevent overflow
  const maxIndex = Math.ceil(data.length / citiesPerSlide()) - 1;

  const nextSlide = () => {
    const totalCities = data.length;
    const citiesToShow = citiesPerSlide();
    setCurrentIndex((prevIndex) =>
      prevIndex >= Math.ceil(totalCities / citiesToShow) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    const totalCities = data.length;
    const citiesToShow = citiesPerSlide();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(totalCities / citiesToShow) - 1
        : prevIndex - 1
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/places/getPlaces"
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/hotels/getHotels"
        );
        setHotels(response.data);
      } catch (error) {
        console.log("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/properties/getAllProperties"
        );
        setAccommodations(response.data);
      } catch (error) {
        console.log("Error fetching accommodations:", error);
      }
    };
    fetchAccommodations();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false); // Hide animation after 4 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (showAnimation) {
    return (
      <div className="animation-container flex items-center justify-center h-screen">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  const handlePlaceClick = (id) => {
    navigate(`/place/${id}`);
  };

  const handleHotelClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  const handleAccommodationClick = (id) => {
    navigate(`/Accommodation/${id}`);
  };

  const handleCitiesClick = (name) => {
    navigate(`/City/${name}`);
  };

  const handleSearch = () => {
    switch (selectedMode) {
      case "flight":
        handleFlightSearch();
        break;
      case "train":
        handleTrainSearch();
        break;
      case "bus":
        handleBusSearch();
        break;
      default:
        toast.error(
          "please select Travel mode, City, Date and No.of Travellers"
        );
        break;
    }
  };
  const handleFlightSearch = () => {
    // Logic for flight search
    if (selectedFrom && selectedTo && formData.checkIn && formData.travelers) {
      navigate(
        `/Flights?departureStation=${selectedFrom}&ArrivalStation=${selectedTo}&date=${formData.checkIn}&adults=${formData.travelers}`
      );
    } else {
      console.log(
        "Please select both departure and arrival cities, date, and number of travelers."
      );
    }
  };

  const handleTrainSearch = () => {
    // Logic for train search
    if (selectedFrom && selectedTo && formData.checkIn && formData.travelers) {
      navigate(
        `/Trains?departureStation=${selectedFrom}&ArrivalStation=${selectedTo}&date=${formData.checkIn}&adults=${formData.travelers}`
      );
    } else {
      console.log(
        "Please select both departure and arrival cities, date, and number of travelers."
      );
    }
  };

  const handleBusSearch = () => {
    // Logic for bus search
    if (selectedFrom && selectedTo && formData.checkIn && formData.travelers) {
      navigate(
        `/Buses?departureStation=${selectedFrom}&ArrivalStation=${selectedTo}&date=${formData.checkIn}&adults=${formData.travelers}`
      );
    } else {
      console.log(
        "Please select both departure and arrival cities, date, and number of travelers."
      );
    }
  };

  return (
    <>
      <Navbar setSearchResultsVisible={setSearchResultsVisible} />
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Welcome to Travelify!</h2>
            <p className="mb-4">
              This final-year college project showcases proficiency in the MERN
              stack, serving as both an academic submission and a portfolio
              piece for job opportunities.
              <br />
              <br />
              <b> Key Features:</b>
              <br />
              <br />
              1. Travel Options:
              <br />- Travel between <b>Mumbai and Pune </b>via Train, Bus, or
              Flights.
              <br />
              <br />
              2. Tourist Attractions:
              <br />- Explore attractions in{" "}
              <b>Ahmedabad, Mumbai, Chennai, and Hyderabad.</b>
              <br />
              <br />
              3. Accommodation:
              <br />- Stay at <b>The Park, Chennai.</b>
              <br />
              <br />
              4. Trip Recommendations:
              <br />- Multiple curated trip plans from <b>Delhi.</b>
              <br />
              <br />
              This project provides a focused travel planning experience while
              demonstrating <b>MERN stack expertise.</b>
              <br />
            </p>
            <button
              onClick={handleClosePopup}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {!searchResultsVisible && (
        
        <div>
          <div className="relative h-screen mt-[-15px] lg:mt-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              {/* // travel buttton */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl">
                <div className="flex justify-center space-x-4 mb-4">
                  <button
                    className={`flex items-center px-4 py-2 rounded ${
                      selectedMode === "flight"
                        ? "bg-blue-300 text-black"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() => {
                      handleModeSelect("flight");
                    }}
                  >
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      className="mr-2"
                      viewBox="0 0 128 128"
                    >
                      <path d="M112.128 17.126a8.787 8.787 0 0 0-.6-.668 8.668 8.668 0 0 0-.67-.6 13.835 13.835 0 0 0-19.6 1.316L78.531 31.815l-47.773-5.943a1.772 1.772 0 0 0-.989.167l-13.415 6.612a1.749 1.749 0 0 0 .314 3.258l47.163 12.826-25.152 28.95-19.513-2.242a1.732 1.732 0 0 0-1.437.5l-4.8 4.8a1.751 1.751 0 0 0 .813 2.936L30.6 87.891a7.515 7.515 0 0 0 9.519 9.487l4.217 16.9a1.75 1.75 0 0 0 2.936.814l4.8-4.8a1.743 1.743 0 0 0 .5-1.437l-2.231-19.427c-.005-.046-.02-.089-.029-.133L79.25 64.154l12.825 47.162A1.751 1.751 0 0 0 93.6 112.6c.056 0 .112.007.169.007a1.749 1.749 0 0 0 1.568-.976l6.611-13.416a1.744 1.744 0 0 0 .167-.989L96.17 49.454l14.645-12.725a13.833 13.833 0 0 0 1.313-19.6zm-1.607 5.5a4.976 4.976 0 0 1-1.672 3.605l-8.67 7.758A4.379 4.379 0 0 1 94 27.806l7.758-8.671a4.977 4.977 0 0 1 3.6-1.673h.145a5.026 5.026 0 0 1 5.018 5.166zm-88.472 11.12 8.8-4.336L75.766 35l-9.387 10.8zm-2.444 45.271L35.9 80.888l-3.368 3.877-14.946-3.729zM49 108.41l-2.02 2.02-3.74-14.99 3.882-3.373zm49.574-11.272-4.336 8.8-12.055-44.333 10.8-9.386zm9.947-63.051-68.141 59.2A4.028 4.028 0 0 1 34.7 87.6l59.2-68.14a10.239 10.239 0 0 1 5.995-3.395 8.58 8.58 0 0 0-.746.732l-7.758 8.671A7.879 7.879 0 0 0 102.513 36.6l8.67-7.757a8.756 8.756 0 0 0 .732-.749 10.237 10.237 0 0 1-3.394 5.993z" />
                    </svg>
                    Flight
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded ${
                      selectedMode === "train"
                        ? "bg-blue-300 text-black"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() => {
                      handleModeSelect("train");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      className="mr-1"
                      viewBox="0 0 64 64"
                      xml:space="preserve"
                    >
                      <path d="M59.224 45.086a9.274 9.274 0 0 0 1.517-1.664C62.197 41.377 63 38.645 63 35.727c0-5.467-2.908-11.35-9.294-11.35h-3.645v-6.173c1.476-.415 2.568-1.76 2.568-3.367a3.519 3.519 0 0 0-3.513-3.517h-9.52a3.52 3.52 0 0 0-3.517 3.517c0 1.606 1.092 2.95 2.569 3.366v6.174h-9.044V12.283h.206a3.52 3.52 0 0 0 3.516-3.516 3.52 3.52 0 0 0-3.516-3.514H6.13a3.518 3.518 0 0 0-3.512 3.514c0 1.589 1.065 2.92 2.513 3.354v32.96H4.28a3.3 3.3 0 0 0-2.317.962A3.3 3.3 0 0 0 1 48.36a3.288 3.288 0 0 0 3.28 3.29h5.738c1.758 4.164 5.902 7.097 10.725 7.097s8.966-2.933 10.725-7.097h10.348c.24 3.924 3.518 7.045 7.525 7.045 4.006 0 7.283-3.121 7.523-7.045h2.306c.863 0 1.687-.339 2.336-.971a3.312 3.312 0 0 0 .954-2.319 3.286 3.286 0 0 0-3.236-3.274zM61 35.726c0 2.47-.689 4.851-1.888 6.536-.8 1.124-2.187 2.436-4.406 2.746V26.45C59.02 27.052 61 31.536 61 35.727zm-22.92-20.89c0-.835.68-1.516 1.516-1.516h9.52a1.515 1.515 0 0 1 0 3.03h-9.52a1.517 1.517 0 0 1-1.517-1.513zm2.568 3.514h7.413v6.027h-7.413V18.35zM4.617 8.767c0-.835.678-1.514 1.513-1.514H29.81c.836 0 1.516.679 1.516 1.514 0 .836-.68 1.516-1.516 1.516H6.13c-.834 0-1.512-.68-1.512-1.516zm2.513 3.516h20.473v13.094a1 1 0 0 0 1 1h24.102V44.49a7.528 7.528 0 0 0-7.723.59H32.164c-1.004-5.362-5.739-9.437-11.421-9.437S10.325 39.718 9.32 45.08h-2.19V12.283zM4.28 49.65a1.287 1.287 0 0 1-.903-2.193c.24-.24.569-.377.903-.377h4.843c0 .04-.006.077-.006.116 0 .843.097 1.663.27 2.454H4.28zm16.463 7.097c-5.308 0-9.626-4.284-9.626-9.55 0-5.268 4.318-9.554 9.626-9.554s9.626 4.286 9.626 9.553c0 5.267-4.319 9.551-9.626 9.551zm11.62-9.667h10.673a7.426 7.426 0 0 0-1.08 2.57h-9.858c.174-.791.27-1.611.27-2.454 0-.039-.005-.077-.005-.116zm16.978 9.615c-2.904 0-5.289-2.224-5.525-5.045h5.144a1 1 0 1 0 0-2h-4.941a5.548 5.548 0 0 1 5.322-3.957c3.058 0 5.547 2.467 5.547 5.5 0 3.034-2.489 5.502-5.547 5.502zm10.75-7.43a1.319 1.319 0 0 1-.921.385h-2.444a7.428 7.428 0 0 0-1.082-2.57h3.526c.7 0 1.29.586 1.29 1.28 0 .34-.137.667-.368.905z" />
                      <path d="M20.743 42.798c-2.437 0-4.42 1.973-4.42 4.398 0 2.423 1.983 4.395 4.42 4.395s4.418-1.972 4.418-4.395c0-2.425-1.982-4.398-4.418-4.398zm0 6.793c-1.334 0-2.42-1.074-2.42-2.395 0-1.322 1.086-2.398 2.42-2.398 1.333 0 2.418 1.076 2.418 2.398 0 1.32-1.085 2.395-2.418 2.395zM12.688 26.377h9.233a1.994 1.994 0 0 0 1.993-1.992V17.77c0-1.1-.894-1.995-1.993-1.995h-9.233a1.996 1.996 0 0 0-1.992 1.995v6.614c0 1.098.894 1.992 1.992 1.992zm.009-8.6 9.217-.006.007 6.606-9.225.008v-6.609zM44.027 31.126h4.214a1 1 0 1 0 0-2h-4.214a1 1 0 1 0 0 2zM44.027 35.485h4.214a1 1 0 1 0 0-2h-4.214a1 1 0 1 0 0 2z" />
                    </svg>
                    Train
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded ${
                      selectedMode === "bus"
                        ? "bg-blue-300 text-black"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() => {
                      handleModeSelect("bus");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      className="mr-1"
                      viewBox="0 0 128 128"
                    >
                      <rect
                        x="47.853"
                        y="37.377"
                        width="19.13"
                        height="17.57"
                        rx="1"
                      />
                      <path d="M36.64 74.97a14.325 14.325 0 1 0 14.33 14.32 14.331 14.331 0 0 0-14.33-14.32zm0 22.127a7.8 7.8 0 1 1 7.805-7.8 7.813 7.813 0 0 1-7.802 7.803z" />
                      <rect
                        x="17.01"
                        y="37.377"
                        width="19.13"
                        height="17.57"
                        rx="1"
                      />
                      <path d="M116.78 71.545a1.489 1.489 0 0 0 1.485 1.485h2.725v-2.97h-2.725a1.489 1.489 0 0 0-1.485 1.485zM96.88 85.487a3.805 3.805 0 1 0 3.805 3.805 3.809 3.809 0 0 0-3.805-3.805z" />
                      <path d="M96.88 74.97a14.325 14.325 0 1 0 14.33 14.32 14.34 14.34 0 0 0-14.33-14.32zm0 22.127a7.8 7.8 0 1 1 7.805-7.8A7.813 7.813 0 0 1 96.88 97.1zM16.48 71.545A1.489 1.489 0 0 0 15 70.06H7.01v2.97H15a1.489 1.489 0 0 0 1.48-1.485zM36.643 85.487a3.805 3.805 0 1 0 3.805 3.805 3.809 3.809 0 0 0-3.805-3.805z" />
                      <path d="M111.253 55.29a4.358 4.358 0 0 1-4.393-4.32v-6.88a16.71 16.71 0 0 0-16.71-16.71H10.01a3.009 3.009 0 0 0-3 3v35.68H15a5.5 5.5 0 0 1 5.485 5.485A5.5 5.5 0 0 1 15 77.03H7.01v7a3.261 3.261 0 0 0 3.26 3.26h8.16a18.325 18.325 0 0 1 36.43 0h23.8a18.331 18.331 0 0 1 36.44 0h2.63a3.261 3.261 0 0 0 3.26-3.26v-7h-2.725a5.485 5.485 0 0 1 0-10.97h2.725v-.96a9.822 9.822 0 0 0-9.737-9.81zM40.14 53.947a5.006 5.006 0 0 1-5 5H18.01a5.006 5.006 0 0 1-5-5v-15.57a5.006 5.006 0 0 1 5-5h17.13a5.006 5.006 0 0 1 5 5zm30.842 0a5.006 5.006 0 0 1-5 5H48.853a5.006 5.006 0 0 1-5-5v-15.57a5.006 5.006 0 0 1 5-5h17.129a5.006 5.006 0 0 1 5 5zm29.839 0a5.006 5.006 0 0 1-5 5H80.438a5.163 5.163 0 0 1-5.156-5.156V38.536a5.163 5.163 0 0 1 5.156-5.156h9.645a10.75 10.75 0 0 1 10.738 10.739z" />
                      <path d="M90.083 37.38h-9.645a1.157 1.157 0 0 0-1.156 1.156v15.252a1.158 1.158 0 0 0 1.156 1.156h15.383a1 1 0 0 0 1-1v-9.825a6.746 6.746 0 0 0-6.738-6.739z" />
                    </svg>
                    Bus
                  </button>
                </div>
                <form className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <div
                      onClick={() => setOpenFrom(!openFrom)}
                      className="bg-white w-full p-2 flex items-center justify-between rounded border cursor-pointer"
                    >
                      {selectedFrom || "Select From"}
                      <BiChevronDown
                        size={20}
                        className={`${openFrom && "rotate-180"}`}
                      />
                    </div>
                    {openFrom && (
                      <ul className="bg-white mt-2 overflow-y-auto max-h-60 absolute w-full z-10 border rounded cursor-pointer">
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                          <AiOutlineSearch
                            size={18}
                            className="text-gray-700"
                          />
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) =>
                              setInputValue(e.target.value.toLowerCase())
                            }
                            placeholder="Enter city name"
                            className="p-2 outline-none cursor-pointer"
                          />
                        </div>
                        {filteredFromCities.map((city) => (
                          <li
                            key={city.name}
                            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                          ${
                            city.name.toLowerCase() ===
                              selectedFrom.toLowerCase() &&
                            "bg-sky-600 text-white"
                          }
                          ${
                            city.name.toLowerCase().startsWith(inputValue)
                              ? "block"
                              : "hidden"
                          }`}
                            onClick={() => {
                              setSelectedFrom(city.name);
                              setOpenFrom(false);
                              setInputValue("");
                            }}
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative">
                    <div
                      onClick={() => setOpenTo(!openTo)}
                      className="bg-white w-full p-2 flex items-center justify-between rounded border cursor-pointer"
                    >
                      {selectedTo || "Select To "}
                      <BiChevronDown
                        size={20}
                        className={`${openTo && "rotate-180 cursor-pointer"}`}
                      />
                    </div>
                    {openTo && (
                      <ul className="bg-white mt-2 overflow-y-auto max-h-60 absolute w-full z-10 border rounded">
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                          <AiOutlineSearch
                            size={18}
                            className="text-gray-700"
                          />
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) =>
                              setInputValue(e.target.value.toLowerCase())
                            }
                            placeholder="Enter city name"
                            className="p-2 outline-none cursor-pointer"
                          />
                        </div>
                        {filteredToCities.map((city) => (
                          <li
                            key={city.name}
                            className={`p-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer
                          ${
                            city.name.toLowerCase() ===
                              selectedTo.toLowerCase() &&
                            "bg-sky-600 text-white"
                          }
                          ${
                            city.name.toLowerCase().startsWith(inputValue)
                              ? "block"
                              : "hidden"
                          }`}
                            onClick={() => {
                              setSelectedTo(city.name);
                              setOpenTo(false);
                              setInputValue("");
                            }}
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <input
                    type="date"
                    name="checkIn"
                    placeholder="Select Check-In Date"
                    className="p-2 border rounded cursor-pointer"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.showPicker()}
                  />
                  <input
                    type="number"
                    name="travelers"
                    placeholder="No. of Travelers"
                    className="p-2 border rounded cursor-pointer"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="0"
                  />
                </form>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 text-white rounded-md bg-purple-500 hover:bg-purple-700"
                  >
                    {selectedMode === "flight"
                      ? "Search Flights"
                      : selectedMode === "train"
                      ? "Search Trains"
                      : selectedMode === "bus"
                      ? "Search Buses"
                      : "Search"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full bg-white">
            <h1 className="text-3xl font-bold tex ml-10 pt-3 hover:text-4xl">
              Most Adorable Places
            </h1>

            {/* //places card */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4 ml-3 mr-3">
              {places.slice(0, 10).map((place) => (
                <div
                  key={place._id}
                  className="p-4 rounded-lg shadow-lg cursor-pointer hover:bg-slate-950 border border-black border-opacity-100 group"
                  onClick={() => handlePlaceClick(place._id)}
                >
                  <div className="img">
                    <img
                      className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                      src={place.photos[0]}
                      alt={place.title}
                    />
                    <h1 className="text-lg font-bold justify-start mt-1 text-black md:text-2xl lg:text-2xl group-hover:text-white">
                      {place.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/places")}
                className="bg-purple-500 text-white p-3 rounded-lg mt-3 text-xl mr-3 mb-2  hover:bg-white hover:text-black"
              >
                Explore More
              </button>
            </div>

            <hr className="h-px my-8 bg-black border-0 dark:bg-white mt-[-2px]"></hr>

            <h1 className="text-3xl font-bold tex ml-10 pt-3 hover:text-4xl ">
              Explore Places By City
            </h1>
            <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      Math.min(currentIndex, maxIndex) *
                      (100 / citiesPerSlide())
                    }%)`,
                  }}
                >
                  {data.map((city) => (
                    <div
                      key={city.id}
                      className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-6`}
                    >
                      <div
                        onClick={() => handleCitiesClick(city.name)}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <img
                          src={city.img}
                          alt={city.name}
                          className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            {city.name}
                          </h3>

                          <button
                            onClick={() => handleCitiesClick(city.name)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                            aria-label={`Learn more about ${city.name}`}
                          >
                            Explore Places
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-[-4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-gray-800 text-2xl" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-[-6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-gray-800 text-2xl" />
              </button>
            </div>

            <hr className="h-px my-8 bg-black border-0 dark:bg-white mt-1"></hr>

            {/*  Hotels card */}
            <h1 className="text-3xl font-bold tex ml-10 pt-3 hover:text-4xl mt-[-20px]">
              Lavish Hotels
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 ml-3 mr-3">
              {hotels.slice(0, 8).map((hotel) => (
                <div
                  key={hotel._id}
                  className="p-4 rounded-lg shadow-lg cursor-pointer hover:bg-slate-950 text-black border border-black border-opacity-100 group"
                  onClick={() => handleHotelClick(hotel._id)}
                >
                  <div className="">
                    <img
                      className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                      src={hotel.photos[0]}
                      alt={hotel.title}
                    />
                    <h1 className="text-lg font-bold justify-start mt-1 text-black md:text-2xl lg:text-2xl group-hover:text-white">
                      {hotel.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/Hotels")}
                className="bg-purple-500 text-white p-3 rounded-lg mt-3 text-xl mr-3 mb-2  hover:bg-white hover:text-black"
              >
                Explore More
              </button>
            </div>

            <hr className="h-px my-8 bg-black border-0 dark:bg-white mt-[-2px]"></hr>

            {/* Accommodations card */}
            <h1 className="text-3xl font-bold tex ml-10 pt-3 hover:text-4xl mt-[-20px]">
              Luxurious Accommodations
            </h1>
            <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 mt-4 ml-3">
              {accommodations.map((accommodation) => (
                <div
                  key={accommodation._id}
                  className="p-4 rounded-lg shadow-lg cursor-pointer hover:bg-slate-950 text-black border border-black border-opacity-100 group"
                  onClick={() => handleAccommodationClick(accommodation._id)}
                >
                  <div className="img">
                    <img
                      src={accommodation.photos[0]}
                      className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                      alt={accommodation.title}
                    />
                    <div className="mt-1">
                      <h4 className="text-lg font-bold justify-start mt-1 text-black md:text-2xl lg:text-2xl group-hover:text-white">
                        {accommodation.title}
                      </h4>
                      <p className="text-lg font-bold justify-start mt-1 text-black md:text-2xl lg:text-2xl group-hover:text-white">
                        {accommodation.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/Accommodations")}
                className="bg-purple-500 text-white p-3 rounded-lg mt-1 text-xl mr-3 mb-2 hover:bg-white hover:text-black"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;

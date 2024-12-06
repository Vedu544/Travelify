import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce"; // Add this import for debouncing
import { MdMenu } from "react-icons/md";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = ({ setSearchResultsVisible }) => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]); // New state for suggestions
  const [debouncedSearchInput] = useDebounce(searchInput, 300); // Debounce the input

  const[open, setopen] = useState(false)
  const handleTravelifyClick = () => {
    navigate("/");
  };

  const handlePlaceClick = (id) => {
    navigate(`/place/${id}`);
   
  };

  const handleHotelClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  const handleAccommodationClick = (id) => {
    navigate(`/Accommodation/${id}`);
  };
  const handleCloseNavbar = () => {
    setopen(false); // Function to close the navbar
  };


  const handleSuggestionClick = (suggestion) => {
    console.log("Selected suggestion ID:", suggestion.id); 
    if (suggestion.type === 'place') {
        navigate(`/place/${suggestion.id}`); 
    } else if (suggestion.type === 'hotel') {
        navigate(`/hotel/${suggestion.id}`); 
    } else if (suggestion.type === 'property') {
        navigate(`/Accommodation/${suggestion.id}`);
    }
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/SearchRoutes/searchByName",
        null,
        { params: { title: searchInput } }
      );
      setSearchResults(response.data);
      setSearchResultsVisible(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearchResults(null);
      if (typeof setSearchResultsVisible === 'function') {
        setSearchResultsVisible(false); // Set visible state to false when input is cleared
      }
    }
  }, [searchInput, setSearchResultsVisible]);

  // Fetch suggestions when the input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/SearchRoutes/searchSuggestions`,
            { params: { query: debouncedSearchInput } }
          );
          setSearchSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSearchSuggestions([]); // Clear suggestions if input is empty
      }
    };

    fetchSuggestions();
  }, [debouncedSearchInput]);

  return (
    <>
      <nav className="bg-green-300 p-2 flex flex-row  md:flex-row items-center justify-start md:justify-between lg:justify-between">
        <div className="flex w-full md:w-auto justify-start lg:justify-between mb-4 ml-3 md:mb-0">
          <div
            className="font-bold text-black lg:text-3xl text-3xl cursor-pointer lg:pt-2 "
            onClick={handleTravelifyClick}
          >
            Travelify
          </div>
        </div>
        

        {/* Search bar */}
        <form
          className="w-full md:w-auto mb-4 md:mb-0 mr-2 mt-2"
          onSubmit={handleSearchSubmit}
        >
          <div className="flex relative">
            {" "}
            {/* Added relative for positioning suggestions */}
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Places & hotels"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            {/* Suggestions Box */}
            {searchSuggestions.length > 0 && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-10 w-full">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      console.log("Suggestion object:", suggestion); // Log the entire suggestion object
                      handleSuggestionClick(suggestion); // Pass the entire suggestion object
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {suggestion.title}{" "}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* //menu icon for sm screen */}
        <div className="lg:hidden mt-[-9px]" onClick={()=> setopen(!open)}>
          <MdMenu size={42} className="text-white cursor-pointer"
           />
        
        </div>

        {/* Display search results */}

        <ul className="hidden md:hidden lg:flex flex-wrap justify-center md:justify-end space-x-1 gap-1 md:space-x-4 mt-3">
          {[
            "Trip Recommendation",
            "Bookings",
            "Your Accommodation",
            "Login/Register",
          ].map((item, index) => (
            <li key={index} className="my-2">
              <NavLink
                to={
                  item === "Your Accommodation"
                    ? `/YourAccommodations/${userId}` // Attach userId to the link
                    : item === "Login/Register"
                    ? "/register"
                    : item === "Bookings"
                    ? `/Bookings/${userId}`
                    : item === "Trip Recommendation"
                    ? "/TripRecommendation"
                    : "/"
                }
                className="relative inline-block font-light group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-indigo-600 group-hover:bg-indigo-50"></span>
                <span className="relative text-indigo-600 text-sm md:text-base px-4 py-2 block">
                  {item}
                </span>
              </NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <li className="my-2">
              <NavLink to="/Profile" className="inline-block mt-[-10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-indigo-600 w-11 h-11 mt-2 lg:mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {searchResults && (
        <div className="search-results grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {searchResults.hotels.map((hotel, index) => (
            <div
              key={index}
              className="card bg-white shadow-md w-56 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={hotel.photos[0]}
                alt={hotel.title}
                onClick={() => handleHotelClick(hotel._id)}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{hotel.title}</h3>
              </div>
            </div>
          ))}
          {searchResults.places.map((place, index) => (
            <div
              key={index}
              className="card bg-white shadow-md w-56 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={place.photos[0]}
                alt={place.title}
                onClick={() => handlePlaceClick(place._id)}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{place.title}</h3>
              </div>
            </div>
          ))}
          {searchResults.properties.map((property, index) => (
            <div
              key={index}
              className="card bg-white shadow-md w-56 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={property.photos[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
                onClick={() => handleAccommodationClick(property._id)}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{property.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
        <ResponsiveNavbar open={open} onClose={handleCloseNavbar} />
    </>
  );
};

export default Navbar;

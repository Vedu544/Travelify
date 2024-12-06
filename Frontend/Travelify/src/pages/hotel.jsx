import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddressLink from "../components/Addresslink";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([]); // Added state for rooms

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/hotels/gethotel/${id}`
        );
        console.log("Fetched data:", response.data);
        setHotel(response.data);
        setPhotos(response.data.photos);
        setRooms(response.data.rooms); // Set rooms from fetched hotel data
      } catch (error) {
        console.log("Error fetching place:", error.message);
      }
    };
    fetchHotel();
  }, [id]);

  const navigate = useNavigate()

  const handleRoomClick = (room) => {
    navigate(`/bookingRoom/${room._id}`);
  };

  const prevSlide = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLast = currentIndex === photos.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 h-full text-white">
        <div className="ml-4 pb-20">
          {hotel ? (
            <>
              <h1 className="text-3xl pt-4">{hotel.title}</h1>
              <div className="flex gap-1 text-2xl">
                <AddressLink>{hotel.city}</AddressLink>
                <span className="text-xl">,</span>
              </div>

              <div className="max-w-[1400px] h-[400px] w-full m-auto py-9 px-14 relative group md:h-[700px] lg-h-[700px]">
                <div
                  style={{ backgroundImage: `url(${photos[currentIndex]})` }}
                  className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                >
                  <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                  </div>

                  <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl text-white font-bold ml-10 mt-5">Address:</h1>
              <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md hover:bg-black hover:text-white">
                {hotel.address}
              </div>

              <h1 className="text-3xl text-white font-bold ml-10 mt-5">About {hotel.title}:</h1>
              <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md hover:bg-black hover:text-white">
                {hotel.description}
              </div>

              <h1 className="text-3xl text-white font-bold ml-10 mt-5">Price Range :</h1>
              <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md hover:bg-black hover:text-white">
                {`${hotel.priceRange.min}-${hotel.priceRange.max}`}
              </div>

              <h1 className="text-3xl text-white font-bold ml-10 mt-5">Rooms:</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md">
                {rooms.map(room => (
                  <div key={room._id} className="mb-4 p-4 bg-gray-200 rounded-md">
                    <img
                  className="h-35 w-50 rounded-sm"
                  src={room.photos[0]}
                  alt="room"
                />
                    <h2 className="text-xl mt-4 font-bold">{room.title}</h2>
                    <h3 className="font-medium">{room.address}</h3>
                    <p>Price: {room.price}</p>
                    <p>Max People: {room.maxPeople}</p>
                    <p>Category: {room.category}</p>
                    <p>Description: {room.desc}</p>
                    <ul>
                      {room.roomNumbers.map((roomNumber, index) => (
                        <li key={index}>Number: {roomNumber.number}</li>
                      ))}
                    </ul>
                    <div>
                      <button onClick={() => handleRoomClick(room)}
                        className="bg-orange-500 text-white p-3 rounded-lg mt-3 text-xl mr-3 mb-2 hover:bg-white hover:text-black">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1 className="text-3xl pt-4">Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Hotel;
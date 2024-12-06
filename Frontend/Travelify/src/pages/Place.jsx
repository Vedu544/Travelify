import React, { useEffect, useState } from "react"; // Combined imports for useEffect and useState
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddressLink from "../components/Addresslink";
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'

const Place = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  const [photos, setPhotos] = useState([]); // Added state for photos

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/places/getPlace/${id}`
        );
        setPlace(response.data);
        setPhotos(response.data.photos); // Set photos from fetched place data
      } catch (error) {
        console.log("Error fetching place:", error.message);
      }
    };
    fetchPlace();
  }, [id]);

  const[currentIndex,setCurrentIndex] = useState(0)

  const prevSlide = ()=>{
    const isFirst = currentIndex === 0
    const newIndex = isFirst ? photos.length-1 : currentIndex-1;
    setCurrentIndex(newIndex)
  }

  const nextSlide = ()=>{
    const isLast = currentIndex === photos.length-1
    const newIndex = isLast? 0 : currentIndex+1;
    setCurrentIndex(newIndex)
  }
  return (
    <>
      <Navbar />
      <div className="bg-slate-950 h-full text-white">
        <div className="ml-4 pb-20">
          {place ? (
            <>
              <h1 className="text-3xl pt-4">{place.title}</h1>
              <div className="flex gap-1">
                <AddressLink>{place.location}</AddressLink>
              </div>
             
             <div className="max-w-[1400px] h-[400px] w-full m-auto py-9 px-14 relative group md:h-[700px] lg-h-[700px]">
              <div style={{backgroundImage : `url(${photos[currentIndex]})`}} // Changed from place.photos to photos
              className="w-full h-full rounded-2xl bg-center bg-cover duration-500">

                {/* //left arrow */}
                <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>

                {/* //right arrow */}
                <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight onClick={nextSlide} size={30}/> 
                </div>
              </div>
             </div>

             <h1 className="text-3xl text-white font-bold ml-10">City:</h1>
             <div className="mt-2 text-bold text-2xl text-black ml-11 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {place.City}
             </div>

             <h1 className="text-3xl text-white font-bold ml-10 mt-5 ">About {place.title} : </h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md hover:bg-black hover:text-white">
              {place.description}
             </div>

             <h1 className="text-3xl text-white font-bold ml-10 mt-5">ExtraInfo : </h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {place.extraInfo}
             </div>
            </>
          ) : (
            <h1 className="text-3xl pt-4">Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
}
export default Place;

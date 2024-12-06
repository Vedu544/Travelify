import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import AddressLink from '../components/Addresslink'
import { useNavigate } from 'react-router-dom'


const Accommodation = () => {
  const {id} = useParams()
  const [accommodation,setAccommodation] = useState([])
  const [photos, setPhotos] = useState([]); // Added state for photos

  useEffect(() => {
    const getAccommodation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/getProperty/${id}`)
        console.log(response.data)
        setAccommodation(response.data)
        setPhotos(response.data.photos) // Added photos to state
      } catch (error) {
        console.log(error)
      }
    }
    getAccommodation()
  }, [id]) // Add id as a dependency

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

  const navigate = useNavigate()

  
  const handleBooking = (id)=>{
    navigate(`/AccommodationBooking/${id}`)
  }
  return (
    <>
    <Navbar />
    <div className="bg-slate-950 h-full text-white">
        <div className="ml-4 pb-20">
          {accommodation ? (
            <>
              <h1 className="text-2xl pt-4 md:text-3xl lg:text-3xl">{accommodation.title}</h1>
              <div className="flex gap-1">
                <AddressLink>{accommodation.address}</AddressLink>
              </div>
             
             <div className="max-w-[1400px] h-[400px] w-full m-auto py-9 px-14 relative group md:h-[700px] lg-h-[700px]">
              <div style={{backgroundImage : `url(${photos[currentIndex]})`}} // Changed from place.photos to photos
              className="w-full h-full rounded-2xl bg-center bg-cover duration-500">

                {/* //left arrow */}
                <div className="absolute top-[50%] left-5 transform -translate-y-1/2 text-2xl rounded-full bg-black/50 text-white cursor-pointer z-10 group-hover:block">
                  <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>

                {/* //right arrow */}
                <div className="absolute top-[50%] right-5 transform -translate-y-1/2 text-2xl rounded-full bg-black/50 text-white cursor-pointer z-10 group-hover:block">
                  <BsChevronCompactRight onClick={nextSlide} size={30}/> 
                </div>
              </div>
             </div>

             <h1 className="text-3xl text-white font-bold ml-10">Max Guests:</h1>
             <div className="mt-2 text-bold text-2xl text-black ml-11 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {accommodation.maxGuests}
             </div>

             <h1 className="text-3xl text-white font-bold ml-10 mt-5 ">About {accommodation.title} : </h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md hover:bg-black hover:text-white">
              {accommodation.description}
             </div>

             <h1 className="text-3xl text-white font-bold ml-10 mt-5">ExtraInfo : </h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {accommodation.extraInfo}
             </div>

             <h1 className="text-3xl text-white font-bold ml-10 mt-5">Price (Per Night) : </h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {accommodation.price}
             </div>

             {/* <h1 className="text-3xl text-white font-bold ml-10 mt-5">Perks:</h1>
             <div className="mt-2 text-bold text-2xl text-black ml-10 mr-4 bg-white p-3 rounded-md  hover:bg-black hover:text-white">
              {accommodation.perks.map((perk, index) => (
                <div key={index}>{perk}</div>
              ))}
             </div> */}

             {/* //book Now button */}
             <div className="flex justify-end mt-3"> 
               <button 
               onClick={() => handleBooking(accommodation._id)} // Use an arrow function to pass the ID
               className="mt-4 bg-blue-500 text-black rounded-md p-3 mr-6 text-2xl">
                 Book Now
               </button>
             </div>
            </>
          ) : (
            <h1 className="text-3xl pt-4">Loading...</h1>
          )}
        </div>
        
      </div>
    </>
    
  )
}

export default Accommodation
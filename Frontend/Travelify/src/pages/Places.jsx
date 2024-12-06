import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Places = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/places/getPlaces')
        setPlaces(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPlaces()
  }, [])

  const handlePlaceClick = (id) => {
    navigate(`/place/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className='bg-white'>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 ml-3 mr-3 pt-5">
          {places.map((place) => (
            <div
              className="p-3 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-600 flex flex-col cursor-pointer mb-10"
              key={place._id}
            >
              <img
                src={place.photos[0]}
                className="shadow rounded-lg overflow-hidden border h-48 w-full object-cover"
                alt={place.title}
              />
              <div className="mt-4 flex flex-col items-start w-full"> {/* Changed to flex-col and items-start */}
                <h4 className="font-bold text-xl md:text-2xl lg:text-xl whitespace-nowrap">{place.title}</h4>
                <p className="mt-2 text-xl font-semibold text-black">{place.City}</p>
                <button
                  type="button"
                  onClick={() => handlePlaceClick(place._id)}
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
  )
}

export default Places
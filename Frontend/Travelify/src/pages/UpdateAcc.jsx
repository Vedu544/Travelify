import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Perks from "../components/perks"
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';



const UpdateAcc = () => {

  const navigate = useNavigate()
  const { id } = useParams(); // Get the property ID from the URL
  const [formData, setFormData] = useState({
    title:'',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    maxGuests: '',
    price: '',
    photos: null,
    addedPhotos: [], // For existing photos
  });

  // Log formData whenever it changes


  useEffect(() => {
    // Fetch the existing property data
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/getProperty/${id}`);
        const property = response.data;
        setFormData({
          ...formData,
          title: property.title,
          address: property.address,
          description: property.description,
          perks: property.perks,
          extraInfo: property.extraInfo,
          maxGuests: property.maxGuests,
          price: property.price,
          addedPhotos: property.photos, // Set existing photos
        });
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: e.target.files,
    });
  };

  const handlePerksChange = (selectedPerks) => {
    setFormData({
      ...formData,
      perks: selectedPerks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Ensure all fields are appended to FormData
    for (const key in formData) {
      if (key === 'photos') {
        if (formData.photos) {
          Array.from(formData.photos).forEach((file) => {
            data.append('photos', file);
          });
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    // Log FormData content for debugging
    for (let pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/properties/updateProperties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Property updated successfully:', response.data);
      toast.success('Property updated successfully!');
      navigate("/")
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <h1 className='text-center text-bold text-2xl mt-3'>Update Accommodation</h1>
    <form onSubmit={handleSubmit} className="bg-orange-500 p-6 rounded-md border-4 border-gray-400 ml-4 mr-4 mt-4" >
      <div className="flex flex-col space-y-4">
        <label className="block">
          <span className="text-white text-xl font-semibold">Title</span>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Address</span>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Description</span>
          <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Perks</span>
          <Perks selected={formData.perks} onChange={handlePerksChange} />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Extra Info</span>
          <textarea name="extraInfo" value={formData.extraInfo} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Max Guests</span>
          <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Price</span>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Photos</span>
          <input type="file" name="photos" multiple onChange={handleFileChange} className="mt-1 block w-full p-2" />
        </label>
      </div>
      
      <div className='flex justify-center'> 
        <button type="submit" className="mt-4 bg-white text-orange-500 rounded-md p-3 w-1/2 text-2xl hover:bg-black">
          Update
        </button>
      </div>
    </form>
    </>
    
  );
};

export default UpdateAcc;
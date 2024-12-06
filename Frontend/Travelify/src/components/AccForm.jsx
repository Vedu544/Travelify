import React, { useState } from 'react';
import axios from 'axios';
import Perks from "../components/perks"; // Import the Perks component
import { toast } from 'react-toastify';


const AccForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [], // Change perks to an array
    extraInfo: '',
    maxGuests: '',
    price: '',
    photos: null,
  });

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
    for (const key in formData) {
      if (key === 'photos') {
        Array.from(formData.photos).forEach((file) => {
          data.append('photos', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/api/properties/postProperties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Property posted successfully:', response.data);
      toast.success('Property posted successfully! , Check "Your Accommmodation"')
    } catch (error) {
      console.error('Error posting property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-orange-500 p-6 rounded-md border-4 border-gray-400 ml-4 mr-4">
      <div className="flex flex-col space-y-4">
        <label className="block">
          <span className="text-white text-xl font-semibold">Title</span>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Address</span>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Description</span>
          <textarea name="description" placeholder="Description" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Perks</span>
          <Perks selected={formData.perks} onChange={handlePerksChange} /> {/* Use the Perks component */}
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Extra Info</span>
          <textarea name="extraInfo" placeholder="Extra Info" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Max Guests</span>
          <input type="number" name="maxGuests" placeholder="Max Guests" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold">Price</span>
          <input type="number" name="price" placeholder="Price" onChange={handleChange} className="mt-1 block w-full p-2" />
        </label>
        <label className="block">
          <span className="text-white text-xl font-semibold ">Photos</span>
          <input type="file" name="photos" multiple onChange={handleFileChange} className="mt-1 block w-full p-2" />
        </label>
      </div>
      
      <div className='flex justify-center'> 
      <button type="submit" className="mt-4 bg-white text-orange-500 rounded-md p-3 w-1/2 text-2xl  hover:bg-black">
      Submit</button>
      </div>
    
    </form>
  );
};

export default AccForm;

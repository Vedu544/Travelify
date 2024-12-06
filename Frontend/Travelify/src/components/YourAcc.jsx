import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAccommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState([]);
  
  useEffect(() => {
    const getMyAccommodation = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/properties/getMyProperties/${id}`
        );
        setAccommodations(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyAccommodation();
  }, [id]);


    const deleteAccommodation = async () => {
      try {
        console.log("Deleting accommodation with ID:", confirmDelete); // Debug log
        const response = await axios.delete(`http://localhost:3000/api/properties/deleteProperties/${confirmDelete}`);
        // console.log("Delete response:", response.data); // Debug log
        setAccommodations(accommodations.filter(acc => acc._id !== confirmDelete));
        closeModal();
        toast.success("Accommodations deleted successfully")
      } catch (error) {
        console.log("Error deleting accommodation:", error); // Debug log
        toast.error("Error deleting accommodations")
      }
    }


  const handleView = (id) => {
    navigate(`/Accommodation/${id}`);
  };

  const handleUpdate = (id) => () => {
    navigate(`/UpdateAccommodation/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log("Setting confirmDelete with ID:", id); // Debug log
    setConfirmDelete(id); // Set the ID of the accommodation to be deleted
    setShowModel(true);
  };

  const closeModal = ()=>{
    setShowModel(false);
  }

  return (
    <div className="container mx-auto px-4 mt-3 pb-8">
      {accommodations.map((accommodation, id) => (
        <div
          key={id}
          className="flex flex-col items-center mb-3 bg-gray-600 border border-gray-200 rounded-lg shadow md:flex-row w-full cursor-pointer"
        >
          <img
            className="ml-3 object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={accommodation.photos[0]}
            alt={accommodation.title}
          />
          <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {accommodation.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {accommodation.description}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleView(accommodation._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={handleUpdate(accommodation._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(accommodation._id)} // Pass the id here
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Are You sure you want to delete?
            </h2>
            <div className="flex justify-center space-x-3">
              {/* //cancel button */}
              <button
                onClick={closeModal}
                className="bg-blue-600 p-3 text-white rounded"
              >
                Cancel
              </button>
              {/* //delete button */}
              <button
                onClick={deleteAccommodation} // Use the delete function here
                className="bg-red-600 p-3 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccommodation;

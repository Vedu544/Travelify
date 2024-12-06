import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const[logout,setLogout] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/Profile"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async()=>{

    try {
      const response = await axios.post("http://localhost:3000/api/auth/logout")
      setLogout(response.data)
      toast.success("Logout successful")
      navigate("/")
    } catch (error) {
      console.log("error fetching logout", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 min-h-screen">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md mt-3">
            {user ? (
              <div className="p-6">
                <h1 className="text-4xl mt-3 mb-4">Welcome To Travelify</h1>
                <div className="flex text-3xl text-indigo-900 mb-4">
                  <span>Your Username:</span>
                  <h2 className="text-3xl text-black ml-4 font-bold">
                    {user.username}
                  </h2>
                </div>
                <div className="flex text-3xl text-indigo-900 mb-4">
                  <span>Your Email:</span>
                  <h2 className="text-3xl text-black ml-4 font-bold">
                    {user.email}
                  </h2>
                </div>
              </div>
          
            ) : (
              <div className="text-gray-700 p-6">Loading your profile...</div>
            )}
          </div>
          <div className="flex justify-end">
            <button
            onClick={handleLogout}
            className="bg-blue-500 mt-4 text-white p-3 rounded-lg font-bold text-xl">Logout</button>
          </div>
        </div>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h1 className="text-4xl mb-4">About Us</h1>
              <p className="mt-3 text-xl font-semibold">
                "Travelify is a sophisticated travel planning and booking
                platform. Users can seamlessly discover, book, and review
                destinations. Our unique features allow property owners to list
                their accommodations in the 'Your Accommodation' section.
                Additionally, travelers can explore and manage their trips based
                on their budget in the 'Trip Recommendations' section. Our
                mission is to create a safe, comfortable, and enjoyable travel
                experience, emphasizing high-quality adventures and the discovery
                of new places. This project is officially brought to you by
                Vedant Kulkarni, Durwa Gawade, Sejal Mhaske, and Janhvi
                Lokhande."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
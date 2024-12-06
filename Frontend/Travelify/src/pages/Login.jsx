import React, { useContext } from 'react'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'

const Login = () => {
  const { setIsAuthenticated, setUserId } = useContext(AuthContext); // Ensure setUserId is used
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
 

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => { 
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging line
    setFormData({ ...formData, [name]: value });
    console.log('Updated formData:', { ...formData, [name]: value }); // Debugging line
  };

  const validateForm = () => { 
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          formData
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.data.message || "Login failed");
        }

        const data = response.data;
        toast.success("Login successful!");

        setFormData({
          email: '',
          password: '',
        });

        setIsAuthenticated(true); // Set authentication state
        setUserId(data.id); // Use 'id' instead of 'userId'
        navigate('/'); // Navigate to home page after successful login

        console.log("User ID from response:", data.id); // Log 'id'
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Login failed";
        if (errorMessage === "Invalid email or password") {
          toast.error("Invalid email or password");
        } else {
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <>
     <Navbar />
    <FormContainer>
    <h1 className="text-white text-center text-2xl font-bold mt-4">Login</h1>
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="my-2">
        <label htmlFor="email" className=" text-sm text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
        />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
      </div>

      <div className="my-2">
        <label htmlFor="password" className="block text-sm text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring  text-black"
        />
        {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
      </div>

      <button
        type="submit"
        className="mt-2 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-600 w-full primary md:bg-black lg:bg-black"
      >
        Login
      </button>

      <div className="py-3 text-white flex">
        New User?
        <div className="pl-1">
          <NavLink to="/register" className="hover:underline text-blue-700 ">
            Register Now
          </NavLink>
        </div>
      </div>
    </form>
  </FormContainer>
    </>
   

)
}

export default Login
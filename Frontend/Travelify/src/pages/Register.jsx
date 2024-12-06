import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files[0]) {
        const file = files[0];
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
          alert("Please upload a valid image file (JPG or PNG).");
          return;
        }
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
        setFileNames((prev) => ({ ...prev, [name]: file.name })); // Ensure setFileNames is defined
      }
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    if (
      formData.email &&
      !/^[\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Email format is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formData); // Log formData to check its structure
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      console.log(response);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message || "Registration failed");
      }

      const data = response.data;
      console.log("Registration successful: ", data);
      toast.success("Registration successful!");

      setFormData({
        username: '',
        email: '',
        password: '',
      });

      navigate('/'); // Navigate to home page after successful registration
    } catch (error) {
      console.error("Registration failed: ", error); // Log the error for debugging
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage); // Use toast to display the error message
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <h1 className="text-white text-center text-2xl font-bold mt-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="my-2">
            <label htmlFor="username" className="block text-sm text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
            />
            {error.username && (
              <span className="text-red-500">{error.username}</span>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="email" className="block text-sm text-white">
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
            {error.email && (
              <span className="text-red-500">{error.email}</span>
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
              className="mt-1 w-full p-2 border border-grey-300 rounded-md shadow-sm focus:ring text-black"
            />
            {error.password && (
              <span className="text-red-500">{error.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-600 w-full primary md:bg-black lg:bg-black"
          >
            Register
          </button>

          <div className="py-2 text-white flex">
            Already have an account?
            <div className="pl-1">
              <NavLink to="/Login" className="hover:underline text-blue-700 ">
                Login Now
              </NavLink>
            </div>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default Register;
import React, { useContext } from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { AuthContext } from "../components/AuthContext"
import { NavLink } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

const ResponsiveNavbar = ({open, onClose}) => {
    const {isAuthenticated, userId} = useContext(AuthContext)
  return (
    <AnimatePresence>
    {
        open && (
            <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit={{opacity:0}}
            className='absolute top-10 left-0 w-full h-screen z-20'
            >
                <div className='text-xl font-semibold uppercase bg-purple-700 text-white py-10 m-6 rounded-3xl'>
                    <ul className='flex  flex-col justify-center items-center gap-5 cursor-pointer'>
                        <NavLink to={"/TripRecommendation"}>Trip Recommendations</NavLink>
                        <NavLink to= {`/Bookings/${userId}`}>Bookings</NavLink>
                        <NavLink to={`/YourAccommodation/${userId}`}>Your Accommodation</NavLink>
                        <NavLink to={"/register"}>Login/register</NavLink>

                        
                    </ul>
                </div>
                <div className='absolute top-4 right-8 mt-3 cursor-pointer' onClick={onClose}>
                    <MdClose size={30} color="white" />
                </div>
                

            </motion.div>
        )
    }
    </AnimatePresence>
  );
}

export default ResponsiveNavbar
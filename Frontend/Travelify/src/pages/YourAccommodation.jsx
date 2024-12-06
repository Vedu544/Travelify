import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AccommodationForm from "../components/AccForm";
import MyAccommodation from "../components/YourAcc";
import { useParams } from "react-router-dom";

const YourAccommodation = () => {
    const [showForm, setShowForm] = useState(false);
    const [accommodation, setAccommodation] = useState(false); // Corrected variable name
    const [showMyAccommodation, setShowMyAccommodation] = useState(false); // New state for MyAccommodation4


    const handleButtonClick = () => {
        console.log("buttonClick");
        setShowForm(true);
        setAccommodation(true);
        setShowMyAccommodation(false); // Hide MyAccommodation when adding new
    }

    const handleYourAccommodation = () => {
        setShowForm(false); // Hide form when viewing accommodations
        setShowMyAccommodation(true); // Show MyAccommodation
    }

    return (
        <>
            <Navbar />
            <div className="bg-slate-950 h-full">
                <h1 className="ml-4 text-2xl font-bold text-green-500 pt-3">How to add new Accommodation?</h1>
                <div className="ml-6 text-md  text-justify font-bold mr-4 text-white pt-1 lg:text-justify lg:text-2xl">
                    When you’re ready to add a new accommodation, click the “Add New Accommodation” button. 
                    This will lead you to a form where you can provide essential details about your property—such as its name, location, amenities, and pricing. 
                    Once you’ve filled in the necessary information, save your changes. 
                    Your newly added accommodation will then appear under “My Accommodations,” where you can manage and update it as needed. Happy hosting! 🏨✨
                </div>
                <div className="flex justify-center items-center mt-4 flex-col lg:flex-row">
                    <button onClick={handleButtonClick}
                        className="flex mt-2 text-sm whitespace-nowrap bg-white text-black rounded-sm p-1 ml-2 gap-1 mb-7 lg:p-3 lg:text-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6 mt-1 lg:mt-2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h1 className="pt-1 lg:pt-0">Add New Accomodation</h1>
                    </button>
                    <button onClick={handleYourAccommodation}
                        className="flex mt-2 text-md whitespace-nowrap bg-white text-black rounded-sm p-2 ml-2 gap-1 mb-7 lg:p-3 lg:text-2xl">
                        Your Accommodation
                    </button>
                </div>
                {showForm && accommodation && <AccommodationForm />}
                {showMyAccommodation && <MyAccommodation />} 
            </div>
        </>
    );
};

export default YourAccommodation

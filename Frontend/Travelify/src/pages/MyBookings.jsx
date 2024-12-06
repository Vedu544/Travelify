import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../components/AuthContext";

const MyBookings = () => {
  const [showModel, setShowModel] = useState(false);

  //accomodation
  const [accommodationBooking, setAccommodationBooking] = useState([]);
  const [AccDelete, setAccDelete] = useState([]);
  const [showAccDelete, setShowAccDelete] = useState(false);

  //Room
  const [roomBookings, setRoomBookings] = useState([]);
  const [roomDelete, setRoomDelete] = useState([]);
  const [showRoomDelete, setShowRoomDelete] = useState(false);

  //train
  const [trainBooking, setTrainBooking] = useState(null);
  const [showTrainDelete, setShowTrainDelete] = useState(false);
  const [trainDeleteId, setTrainDeleteId] = useState(null); // State for the train booking ID to delete

  //Flight
  const [FlightBookings, setFlightBookings] = useState([]);
  const [FlightDelete, setFlightDelete] = useState([]);
  const [showFlightDelete, setShowFlightDelete] = useState(false);

  //Bus
  const [BusBookings, setBusBookings] = useState([]);
  const [busBooking, setBusBooking] = useState(null);
  const [showBusDelete, setShowBusDelete] = useState([]);
  const [BusDeleteId, setBusDeleteId] = useState(null); // State for the bus booking ID to delete

  const { isAuthenticated, userId } = useContext(AuthContext);
  const { id } = useParams();

  // Function to handle room deletion
  const handleRoomDelete = (id) => {
    setRoomDelete(id);
    setShowRoomDelete(true);
    setShowAccDelete(false);
    setShowModel(true);
  };

  // Function to handle accommodation deletion
  const handleAccDelete = (id) => {
    setAccDelete(id);
    setShowAccDelete(true);
    setShowRoomDelete(false);
    setShowModel(true);
  };

  // Function to handle train deletion
  const handleTrainDelete = (id) => {
    setTrainDeleteId(id); 
    setShowTrainDelete(true); 
    setShowModel(true); 
    setShowFlightDelete(false)
    setShowBusDelete(false)
  };

   // Function to handle bus deletion
  const handleBusDelete = (id) => {
    setBusDeleteId(id);
    setShowBusDelete(true);
    setShowRoomDelete(false);
    setShowAccDelete(false);
    setShowTrainDelete(false);
    setShowModel(true);
  };


  // Function to handle Flight deletion
  const handleFlightDelete = (id) => {
    setFlightDelete(id);
    setShowFlightDelete(true);
    setShowRoomDelete(false);
    setShowAccDelete(false);
    setShowTrainDelete(false);
    setShowBusDelete(false);
    setShowModel(true);
  }

  // Close modal function
  const closeModal = () => {
    setShowModel(false);
    setShowTrainDelete(false); // Reset train delete modal state
  };

  // Delete room function
  const deleteRoom = async () => {
    try {
      console.log(roomDelete);
      const response = await axios.delete(
        `http://localhost:3000/api/rooms/cancelRoomBookings/${roomDelete}`
      );
      setRoomBookings(roomBookings.filter((room) => room._id !== roomDelete));
      closeModal();
      toast.success("Room Reservation deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Room Reservation");
    }
  };

  // Delete accommodation function
  const deleteAcc = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/bookings/cancelBookings/${AccDelete}`
      );
      setAccommodationBooking(
        accommodationBooking.filter((acc) => acc._id !== AccDelete)
      );
      closeModal();
      toast.success("Accommodation Reservation deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Accommodation Reservation");
    }
  };

  // Delete train function
  const deleteTrainBooking = async () => {
    try {
      console.log(trainDeleteId);
      const response = await axios.delete(
        `http://localhost:3000/api/TrainBookings/cancelBookings/${trainDeleteId}`
      );

      if (trainBooking) {
        setTrainBooking(null); // Clear the train booking after deletion
      }
      closeModal();
      toast.success("Train Reservation deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Train Reservation");
    }
  };

  //delete Bus function
  const deleteBusBookings = async () => {
    try {
      console.log(BusDeleteId);
      const response = await axios.delete(
        `http://localhost:3000/api/BusBookings/cancelBusBooking/${BusDeleteId}`
      );
      if (busBooking) {
        setBusBooking(null);
      }
      closeModal();
      toast.success("Bus Reservation deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Bus Reservation");
    }
  };

  //delete Flight function
  const deleteFlight = async () => {
    try {
      console.log(FlightDelete);
      const response = await axios.delete(
        `http://localhost:3000/api/FlightBookings/cancelFlight/${FlightDelete}`
      );
      // Ensure FlightBookings is set to an empty array if there are no bookings
      if (FlightBookings.length > 0) {
        setFlightBookings(FlightBookings.filter(flight => flight._id !== FlightDelete));
      } else {
        setFlightBookings([]); // Set to empty array instead of null
      }
      closeModal();
      toast.success("Flight Bookings deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Flight Bookings");
    }
  }

  // Fetch Room Bookings
  useEffect(() => {
    const RoomBookings = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/rooms/roomBookings/${id}`
        );
        setRoomBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    RoomBookings();
  }, [id]);

  // Fetch Accommodation Bookings
  useEffect(() => {
    const AccommodationBookings = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/bookings/getMyPropertyBookings/${id}`
        );
        setAccommodationBooking(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    AccommodationBookings();
  }, [id]);

  // Fetch Train Bookings
  useEffect(() => {
    const fetchTrainBooking = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/TrainBookings/getMyTrainBookings/${id}`
        );
        console.log("API Response:", response.data);
        setTrainBooking(response.data);
      } catch (error) {
        console.log("Error fetching train booking:", error);
      }
    };
    fetchTrainBooking();
  }, [id]);

  // Fetch Flight Bookings
  useEffect(() => {
    const FlightBookings = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/FlightBookings/getMyFlightBookings/${id}`
        );
        setFlightBookings(response.data);
        console.log("FlightBookings", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    FlightBookings();
  }, [id]);

  // Fetch Bus Bookings
  useEffect(() => {
    const BusBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/BusBookings/busBookings/${id}`
        );
        setBusBookings(response.data || []);
        console.log("BusBookings", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    BusBookings();
  }, [id]);

  return (
    <>
      <Navbar />
      <h1 className="mt-4 ml-4 text-2xl font-bold">Your Bookings</h1>
      {isAuthenticated ? (
        <>

        {/* //Room bookings section */}
          {roomBookings.length > 0 ? (
            <div className="gap-20 p-2 lg:p-0">
              {roomBookings.map((room, index) => (
                <div
                  key={index}
                  className="bg-white border-pink-500 border-2 h-3/4 mt-3 w-auto lg:w-2/3 lg:ml-6 ml-2 rounded-lg shadow-lg shadow-blue-800"
                >
                  <div className="ml-3 mt-3 mb-2">
                    <h1 className="mt-2 mb-2 font-bold text-2xl">
                      Room Booking
                    </h1>
                    <div className="flex gap-4">
                      {room.photos && (
                        <img
                          className="h-25 w-24 lg:w-40 rounded-sm"
                          src={room.photos[0]}
                          alt="room"
                        />
                      )}
                      <div>
                        <h1 className="text-xl font-bold">Traveller Details</h1>
                        <div className="mt-2 font-semibold gap-2 text-sm lg:text-lg">
                          <p>Name: {room.username}</p>
                          <p>Email: {room.email}</p>
                          <p>Phone: {room.phoneNumber}</p>
                          <p>
                            CheckIn:{" "}
                            {new Date(room.checkIn).toLocaleDateString()}
                          </p>
                          <p>
                            CheckOut:{" "}
                            {new Date(room.checkOut).toLocaleDateString()}
                          </p>
                          <p>TotalPrice: {room.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="mt-3 font-bold text-xl">
                        Booked Room Details
                      </h1>
                      <div className="mt-1 font-semibold gap-2">
                        <p>
                          Room Number:{" "}
                          {room.room.roomNumbers[0]?.number || "N/A"}
                        </p>
                        <p>Hotel Address : {room.address}</p>
                        <p>Room Category : {room.category}</p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRoomDelete(id)}
                          className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          {" "}
                          Cancel Booking{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="mt-4 ml-4 text-xl font-bold">
              No Room Bookings Found
            </h1>
          )}

          {/* Train Booking Section */}
          {trainBooking ? (
            <div className="mt-8 mb-10 p-3 lg:p-0">
              <div className="bg-white border-pink-500 border-2 h-auto mt-3 w-auto lg:w-2/3 ml-2 lg:ml-6 rounded-lg shadow-lg shadow-blue-800">
                <div className="ml-3 mt-3 mb-2">
                  <h1 className="mt-3 font-bold text-xl">
                    Train Booking Details
                  </h1>
                  <div className="mt-1 font-semibold gap-2">
                    <p>Train Name: {trainBooking.name}</p>
                    <p>Train Number: {trainBooking.trainNo}</p>
                    {/* Other details */}
                  </div>
                  <div className="flex justify-end">
                    {/* Call handleTrainDelete when deleting */}
                    <button
                      onClick={() => handleTrainDelete(id)}
                      className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      {" "}
                      Cancel Booking{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="mt-4 ml-4 text-xl font-bold">No Train Bookings Found </h1>
          )}

          {/* //bus booking Section */}
          {BusBookings.length > 0 ? (
            <div className="mt-8 mb-10 p-3 lg:p-0">
              {BusBookings.map((busBooking, index) => (
                <div
                  key={index}
                  className="bg-white border-pink-500 border-2 h-auto mt-3 w-auto lg:w-2/3 ml-2 lg:ml-6 rounded-lg shadow-lg shadow-blue-800"
                >
                  <div className="ml-3 mt-3 mb-2">
                    <h1 className="mt-3 font-bold text-xl">
                      Bus Booking Details
                    </h1>
                    <div className="mt-1 font-semibold gap-2">
                      <p>Bus Title: {busBooking.title}</p>
                      <p>Bus Number: {busBooking.BusNo}</p>
                      <p>Departure Station: {busBooking.departureStation}</p>
                      <p>Arrival Station: {busBooking.ArrivalStation}</p>
                      <p>
                        Departure Time:{" "}
                        {new Date(busBooking.departureTime).toLocaleString()}
                      </p>
                      <p>
                        Arrival Time:{" "}
                        {new Date(busBooking.ArrivalTime).toLocaleString()}
                      </p>
                      <h2 className="mt-3 font-bold text-xl">
                        Traveller Details:
                      </h2>
                      {Array.isArray(busBooking.TravellerDetails) &&
                      busBooking.TravellerDetails.length > 0 ? (
                        busBooking.TravellerDetails.map((traveller, index) => (
                          <div key={index}>
                            <h3 className="mt-3 font-bold text-xl">
                              Traveller {index + 1}:
                            </h3>
                            <p>Name: {traveller.name}</p>
                            <p>Age: {traveller.age}</p>
                            <p>Gender: {traveller.gender}</p>
                            <p>Nationality: {traveller.nationality}</p>
                            <p>Berth Preference: {traveller.berthPreference}</p>
                          </div>
                        ))
                      ) : (
                        <p>No Traveller Details Available</p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleBusDelete(id)}
                        className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        {" "}
                        Cancel Booking{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="mt-4 ml-4 text-xl font-bold">
              No Bus Bookings Found
            </h1>
          )}

          {/* //flight bookings section */}
          {FlightBookings.length > 0 ? (
            <div className="mt-8 mb-10 p-3 lg:p-0">
              {FlightBookings.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white border-pink-500 border-2 h-auto mt-3 w-auto lg:w-2/3 ml-2 lg:ml-6 rounded-lg shadow-lg shadow-blue-800"
                >
                  <div className="ml-3 mt-3 mb-2">
                    <h1 className="mt-3 font-bold text-xl">
                      Flight Booking Details
                    </h1>
                    <div className="mt-1 font-semibold gap-2">
                      <p>Flight Title: {flight.title}</p>
                      <p>Flight Number: {flight.FlightNo}</p>
                      <p>Departure Station: {flight.DepartureStation}</p>
                      <p>Arrival Station: {flight.ArrivalStation}</p>
                      <p>
                        Departure Time:{" "}
                        {new Date(flight.departureTime).toLocaleString()}
                      </p>
                      <p>
                        Arrival Time:{" "}
                        {new Date(flight.ArrivalTime).toLocaleString()}
                      </p>
                      <p>Total Price: {flight.TotalPrice}</p>
                      <h2 className="mt-3 font-bold text-xl">
                        Traveller Details:
                      </h2>
                      {Array.isArray(flight.TravellerDetails) &&
                      flight.TravellerDetails.length > 0 ? (
                        flight.TravellerDetails.map((traveller, index) => (
                          <div key={index}>
                            <h3 className="mt-3 font-bold text-xl">
                              Traveller {index + 1}:
                            </h3>
                            <p>Name: {traveller.name}</p>
                            <p>Age: {traveller.age}</p>
                            <p>Gender: {traveller.gender}</p>
                            <p>Nationality: {traveller.nationality}</p>
                            <p>Berth Preference: {traveller.berthPreference}</p>
                          </div>
                        ))
                      ) : (
                        <p>No Traveller Details Available</p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleFlightDelete(id)}
                        className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        {" "}
                        Cancel Booking{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="mt-4 ml-4 text-xl font-bold">
              No Flight Bookings Found
            </h1>
          )}



          {/* Confirmation Modal */}
          {showModel && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">
                  {" "}
                  Are You sure you want to delete?{" "}
                </h2>
                <div className="flex justify-center space-x-3">
                  {/* Cancel button */}
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 p-3 text-white rounded"
                  >
                    {" "}
                    Cancel{" "}
                  </button>

                  {/* Conditional rendering for delete buttons */}

                  {/* //delete room popup */}
                  {showRoomDelete && (
                    <button
                      onClick={deleteRoom}
                      className="bg-red-600 p-3 text-white rounded"
                    >
                      {" "}
                      Delete Room{" "}
                    </button>
                  )}

                   {/* //delete flight popup */}
                  {showFlightDelete && (
                    <button
                      onClick={deleteFlight}
                      className="bg-red-600 p-3 text-white rounded"
                    >
                      {" "}
                      Delete Flight Booking{" "}
                    </button>
                  )}

                  {/* //delete Accomodation popup */}
                  {showAccDelete && (
                    <button
                      onClick={deleteAcc}
                      className="bg-red-600 p-3 text-white rounded"
                    >
                      {" "}
                      Delete Accommodation{" "}
                    </button>
                  )}

                  {/* //delete train popup */}
                  {showTrainDelete && (
                    <button
                      onClick={deleteTrainBooking}
                      className="bg-red-600 p-3 text-white rounded"
                    >
                      {" "}
                      Delete Train Booking{" "}
                    </button>
                  )}

                  {/* //delete bus popup */}
                  {showBusDelete && (
                    <button
                      onClick={deleteBusBookings}
                      className="bg-red-600 p-3 text-white rounded"
                    >
                      Delete Bus Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <h1 className="mt-4 ml-4 text-xl font-bold">
          Please log in first to see bookings
        </h1>
      )}
    </>
  );
};

export default MyBookings;

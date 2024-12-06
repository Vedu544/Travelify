import {Route, Routes } from "react-router-dom";
import axios from "axios"

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";

{/* //city */}
import Citypage from "./pages/Citypage";

{/* //hotel & room */}
import Hotel from "./pages/hotel";
import Hotels from "./pages/hotels";
import Room from "./pages/Room";
import BookingRoom from "./pages/BookingRoom"

{/* //places */}
import Place from "./pages/Place";
import Places from "./pages/Places";


{/* //Accommodation */}
import YourAccommodation from "./pages/YourAccommodation";
import Accommodation from "./pages/Accommodation";
import UpdateAcc from "./pages/UpdateAcc";
import AccommodationBooking from "./pages/AccommodationBooking";
import Accommodations from "./pages/Accommodations"


{/* //User */}
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile ";

// Bookings
import MyBookings from "./pages/MyBookings"


//trip reccommendations
import TripRecommendation from "./pages/TripRecommendation";

//Flight, Train , Bus
import Flight from "./pages/Flight";
import FlightBook from "./pages/FlightBook";
import Trains from "./pages/Trains";
import TrainBook from "./pages/TrainBook";
import Buses from "./pages/Buses";
import BusBook from "./pages/BusBook";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
console.log(import.meta.env.VITE_API_BASE_URL)
axios.defaults.withCredentials = true
function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />

          {/* //city */}
          <Route path="/City/:city" element={<Citypage />} />

          {/* //hotel & room */}
          <Route path="/Hotel/:id" element={<Hotel />} />
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/Room/:id" element={<Room />} />
          <Route path = "/bookingRoom/:id" element = {<BookingRoom/>}/>

          {/* //places */}
          <Route path="/Place/:id" element={<Place />} />
          <Route path="/Places" element={<Places />} />
       
          {/* //Accommodation */}
          <Route path = "/YourAccommodations/:userid" element={<YourAccommodation />} />
          <Route path="/Accommodation/:id" element={<Accommodation />} /> {/*//by Acc id */}
          <Route path="/UpdateAccommodation/:id" element={<UpdateAcc />} /> {/*//by Acc id */}
          <Route path = "/AccommodationBooking/:id" element={<AccommodationBooking/>}/> {/*//by Acc id */}
          <Route path="/Accommodations" element={<Accommodations />} />
      
          {/* //User */}
          <Route path = "/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />

          {/* //Bookings */}
          <Route path="/Bookings/:id" element={<MyBookings />} />

          {/* trip reccommendation */}
          <Route path="/TripRecommendation" element={<TripRecommendation/>} />

          {/* Flight, Train, Bus */}
          <Route path="/Flights" element={<Flight />} />
          <Route path="/FlightBook/:id" element={<FlightBook />} />
          <Route path="/Trains" element={<Trains />} />
          <Route path="/TrainBook/:id" element={<TrainBook />} />
          <Route path="/Buses" element={<Buses />} />
          <Route path="/BusBook/:id" element={<BusBook />} />
        
        </Route>
      </Routes>
  );
}

export default App;

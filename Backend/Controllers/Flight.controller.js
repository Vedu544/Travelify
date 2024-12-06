import { Flight } from "../Models/Flight.models.js";

const getFlightDetails = async (req, res) => {
  try {
    const { departureStation, ArrivalStation, title } = req.query;
    const queryObject = {};



    if (!departureStation || !ArrivalStation) {
      return res.status(400).json({ message: "Please enter both departure and arrival stations." });
    }

    if (title) {
      queryObject.title = {$in: title.split(',')}
    }

    console.log(queryObject);

    // Combine the filters into a single queryb
    const Flights = await Flight.find({
      departureStation,
      ArrivalStation,
      ...queryObject // Spread the queryObject to include title if it exists
    }).select(
      "title FlightNo departureStation ArrivalStation departureTime ArrivalTime PriceStarts class"
    );

    console.log(Flights)

    res.status(200).json(Flights); // Return the filtered flights
  } catch (error) {
    res.status(500).json({ message: "failed to find Flights", error });
  }
};

export { getFlightDetails };

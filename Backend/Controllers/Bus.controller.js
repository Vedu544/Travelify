import { Bus } from "../Models/Bus.models.js";

// Filter buses based on departure station and arrival station

const getDetailsBus = async (req, res) => {
  try {
    const { departureStation, ArrivalStation,BusType } = req.query;

    console.log(req.query)
    const queryObject = {}
    // console.log(departureStation || ArrivalStation)
    
    if (!departureStation || !ArrivalStation) {
      return res
        .status(400)
        .json({
          message: "Please enter departure station and arrival station",
        });
    }

    if(BusType){
      queryObject.BusType = {$in:  BusType.split(",")};
    }
    const buses = await Bus.find({
      departureStation ,
      ArrivalStation,
      ...queryObject
      // departureTime: { $gt: currentTime }, // Filter only buses that depart after current time
    }).select(
      "title BusNo departureStation ArrivalStation departureTime ArrivalTime Price SeatsAvailable PickupPoint DropPoint BusType"
    );
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "failed to get bus details" });
  }
}; 

//filter by bus class


export { getDetailsBus };

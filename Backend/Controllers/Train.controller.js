import { Train } from "../Models/Train.model.js";

//filter by Departure Station and Arrival Station

const filterByStation = async (req, res) => {
  try {
    const { departureStation, arrivalStation, trainClass } = req.query; 
    if (!departureStation || !arrivalStation) {
      return res.status(400).json({ message: "Both departureStation and arrivalStation are required" });
    }

    // console.log("Querying trains with:", { departureStation, arrivalStation, trainClass });

    try {
        const trains = await Train.aggregate([
            { $match: { departureStation, arrivalStation } },
            { $unwind: '$trainDetails' },
            { $group: {
                _id: '$_id',
                name: { $first: '$name' },
                departureStation: { $first: '$departureStation' },
                arrivalStation: { $first: '$arrivalStation' },
                trainNo: { $first: '$trainNo' },
                departureTime: { $first: '$departureTime' },
                arrivalTime: { $first: '$arrivalTime' },
                trainDetails: { $push: '$trainDetails' },
            }}
        ]);

        // Split trainClass into an array if it contains multiple classes
        const trainClassesArray = trainClass ? trainClass.split(',') : [];

        const filteredTrains = trainClassesArray.length > 0 ? trains.map(train => ({
            ...train,
            trainDetails: train.trainDetails.filter(detail => trainClassesArray.includes(detail.trainClass))
        })).filter(train => train.trainDetails.length > 0) : trains;

        if (filteredTrains.length === 0) {
            console.log("No trains found for the given criteria."); 
        } else {
            // console.log("Trains found:", filteredTrains);
        }

        res.json(filteredTrains);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error to fetch information" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error to fetch information" });
  }
};

const filterbyLowToHighPrice = async (req, res) => {
  try {
    const lowestToHighest = await Train.find().sort({ price: 1 });
    res.status(200).json(lowestToHighest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error to fetch information" });
  }
};

const filterbyHighToLowPrice = async (req, res) => {
  try {
    const highestToLowest = await Train.find().sort({ price: -1 });
    res.status(200).json(highestToLowest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error to fetch" });
  }
};



export { filterByStation, filterbyLowToHighPrice, filterbyHighToLowPrice};

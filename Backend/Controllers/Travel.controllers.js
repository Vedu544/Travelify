import TravelPlanModel from "../Models/TravellersPlan.model.js";

const destinationIds = {
  Delhi: {
    "1000-3000": ["DL11K3K", "DL21K3K", "DL31K3K", "DL41K3K", "DL52K3K"],
    "3000-6000": ["DL13K6K", "DL23K6K", "DL33K6K", "DL43K6K", "DL53K6K"],
    "6000-10000": ["DL16K10K", "DL26K10K", "DL36K10K", "DL46K10K", "DL56K10K"],
    "10000-15000": ["DL110K15K", "DL210K15K", "DL310K15K", "DL410K15K", "DL510K15K"],
    "15000-20000": ["DL115K20K", "DL215K20K", "DL315K20K", "DL415K20K", "DL515K20K"],
    "20000-30000": ["DL120K30K", "DL220K30K", "DL320K30K", "DL420K30K", "DL520K30K"],
  },


  Mumbai: {
    "1000-3000": ["MB11K3K", "MB21K3K", "MB31K3K", "MB41K3K", "MB52K3K"],
    "3000-6000": ["MB13K6K", "MB23K6K", "MB33K6K", "MB43K6k", "MB53K6K"],
    "6000-10000" :["MB16K10K","MB26K10K","MB36K10K","MB46K10K","MB56K10K"],
    "10000-15000": ["MB110K15K", "MB210K15K", "MB310K15K", "MB410K15K", "MB510K15K"],
    "15000-20000": ["MB115K20K", "MB215K20K", "MB315K20K", "MB415K20K", "MB515K20K"],
    "20000-30000": ["MB120K30K", "MB220K30K", "MB320K30K", "MB420K30K", "MB520K30K"],
  },

  
  Jaipur:{
    "1000-3000": ["JP11K3K", "JP21K3K", "JP31K3K", "JP41K3K", "JP52K3K"],
    "3000-6000": ["JP13K6K", "JP23K6K", "JP33K6K", "JP43K6K", "JP53K6K"],
    "6000-10000": ["JP16K10K", "JP26K10K", "JP36K10K", "JP46K10K", "JP56K10K"],
    "10000-15000": ["JP110K15K", "JP210K15K", "JP315K20K", "JP415K20K", "JP515K20K"],
    "15000-20000": ["JP115K20K", "JP215K20K", "JP315K20K", "JP415K20K", "JP515K20K"],
    "20000-30000": ["JP120K30K", "JP220K30K", "JP320K30K", "JP420K30K", "JP520K30K"],
  },
  Hyderebad:{
    "1000-3000": ["HB11K3K", "HB21K3K", "HB31K3K", "HB41K3K", "HB52K3K"],
    "3000-6000": ["HB13K6K", "HB23K6K", "HB33K6K", "HB43K6K", "HB53K6K"],
    "6000-10000": ["HB16K10K", "HB26K10K", "HB36K10K", "HB46K10K", "HB56K10K"],
    "10000-15000": ["HB110K15K", "HB210K15K", "HB315K20K", "HB415K20K", "HB515K20K"],
    "15000-20000": ["HB115K20K", "HB215K20K", "HB315K20K", "HB415K20K", "HB515K20K"],
    "20000-30000": ["HB120K30K", "HB220K30K", "HB320K30K", "HB420K30K", "HB520K30K"]
  },
  Kolkata:{
    "1000-3000": ["KK11K3K", "KK21K3K", "KK31K3K", "KK41K3K", "KK52K3K"],
    "3000-6000": ["KK13K6K", "KK23K6K", "KK33K6K", "KK43K6K", "KK53K6K"],
    "6000-10000": ["KK16K10K", "KK26K10K", "KK36K10K", "KK46K10K", "KK56K10K"],
    "10000-15000": ["KK110K15K", "KK210K15K", "KK315K20K", "KK415K20K", "KK515K20K"],
    "15000-20000": ["KK115K20K", "KK215K20K", "KK315K20K", "KK415K20K", "KK515K20K"],
    "20000-30000": ["KK120K30K", "KK220K30K", "KK320K30K", "KK420K30K", "KK520K30K"]
  },
  Banglore:{
    "1000-3000": ["BG11K3K", "BG21K3K", "BG31K3K", "BG41K3K", "BG52K3K"],
    "3000-6000": ["BG13K6K", "BG23K6K", "BG33K6K", "BG43K6K", "BG53K6K"],
    "6000-10000": ["BG16K10K", "BG26K10K", "BG36K10K", "BG46K10K", "BG56K10K"],
    "10000-15000": ["BG110K15K", "BG210K15K", "BG315K20K", "BG415K20K", "BG515K20K"],
    "15000-20000": ["BG115K20K", "BG215K20K", "BG315K20K", "BG415K20K", "BG515K20K"],
    "20000-30000": ["BG120K30K", "BG220K30K", "BG320K30K", "BG420K30K", "BG520K30K"]
  },
  Chennai:{
    "1000-3000": ["CN11K3K", "CN21K3K", "CN31K3K", "CN41K3K", "CN52K3K"],
    "3000-6000": ["CN13K6K", "CN23K6K", "CN33K6K", "CN43K6K", "CN53K6K"],
    "6000-10000": ["CN16K10K", "CN26K10K", "CN36K10K", "CN46K10K", "CN56K10K"],
    "10000-15000": ["CN110K15K", "CN210K15K", "CN315K20K", "CN415K20K", "CN515K20K"],
    "15000-20000": ["CN115K20K", "CN215K20K", "CN315K20K", "CN415K20K", "CN515K20K"],
    "20000-30000": ["CN120K30K", "CN220K30K", "CN320K30K", "CN420K30K", "CN520K30K"]
  }
};

const getTravelPlan = async (req, res) => {
  const { location = "Delhi", travellers = 1, budget = "1000-3000" } = req.body;

  try {
    const budgetRanges = destinationIds[location];
    if (!budgetRanges) return res.status(400).json({ message: "Invalid location" });

    const destinationArray = budgetRanges[budget];
    if (!destinationArray) return res.status(400).json({ message: "Invalid budget range" });

    const destinationId = destinationArray[travellers - 1]; // Adjust for zero-based index
    if (!destinationId) return res.status(400).json({ message: "Invalid number of travellers" });

    // Use find instead of findOne to get all matching documents
    const travelPlans = await TravelPlanModel.find({ destination_id: destinationId });
    if (!travelPlans.length) return res.status(404).json({ message: "Travel plans not found" });

    res.status(200).json(travelPlans);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { getTravelPlan };

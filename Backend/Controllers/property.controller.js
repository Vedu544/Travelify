import PropertyModel from "../Models/property.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utillis/error.js"
import { uploadOnCloudinary } from "../Utillis/cloudinary.js";

const postProperty = async (req, res) => {
  //verify user
  const { jwt: token } = req.cookies;
  //get data from property form
  try {
    const {
      title,
      address,
      description,
      photos,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;

    console.log(req.body);

    const photosLocalPath = req.files?.photos[0]?.path
    console.log(photosLocalPath)

    if (!photosLocalPath) {
      return res.status(400).json({ message: "photo is required" });
    }

    const uploadedPhotos = await uploadOnCloudinary(photosLocalPath);

    if (!uploadedPhotos) {
      return res.status(400).json({ message: "photo file is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        console.error("JWT verification error:", err); // Log the error
        return res.status(401).json({ message: "User not authenticated" });
      }

      // console.log("Decoded userData:", userData); // Log the decoded userData

      // if (!userData.userId) { // Change from userData.id to userData.userId
      //   return res.status(401).json({ message: "User not authenticated" });
      // }
      
      const property = await PropertyModel.create({
        owner: userData.userId,
        title,
        address,
        description,
        photos: uploadedPhotos.url,
        perks,
        extraInfo,
        maxGuests,
        price,
      });

      res.json(property);
    });
  } catch (error) {
    return res
      .status(400)
      .json(errorHandler(400, "error saving property", error));
  }
};

//to get all properties which in database
const getAllProperties = async (req, res) => {
  try {
    const properties = await PropertyModel.find();
    res.json(properties);
  } catch (error) {
    return res
      .status(400)
      .json(errorHandler(400, "error finding properties", error));
  }
};

// to update properties which is created by user
const updateProperty = async (req, res) => {
  const { jwt: token } = req.cookies;
  const { id } = req.params; // Extract id from req.params
  try {
    const {
      title,
      description,
      price,
      perks,
      maxGuests,
      extraInfo,
    } = req.body;

    console.log("Received body data:", req.body);

    const addedPhotos = req.body.addedPhotos ? req.body.addedPhotos.split(',') : [];
    const newPhotos = req.files?.photos || [];

    console.log("New photos received:", newPhotos);

    // Upload new photos to Cloudinary
    const uploadedNewPhotos = await Promise.all(
      newPhotos.map(async (file) => {
        try {
          const uploadedPhoto = await uploadOnCloudinary(file.path);
          console.log("Uploaded photo URL:", uploadedPhoto.url);
          return uploadedPhoto.url;
        } catch (uploadError) {
          console.error("Error uploading photo to Cloudinary:", uploadError);
          throw new Error("Failed to upload photo");
        }
      })
    );

    console.log("Uploaded new photos:", uploadedNewPhotos);

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ message: "User not authenticated" });
      }

      const Property = await PropertyModel.findById(id);
      if (!Property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (userData.userId === Property.owner.toString()) {
        Property.set({
          title,
          description,
          price,
          photos: [...addedPhotos, ...uploadedNewPhotos],
          perks,
          maxGuests,
          extraInfo,
        });

        if (!title || !description || !price || !maxGuests || !extraInfo) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const updatedProperty = await Property.save();
        console.log("Updated Property:", updatedProperty);
        res.json(updatedProperty);
      } else {
        return res.status(401).json({ message: "Unauthorized to update property" });
      }
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(400).json(errorHandler(400, "error updating property", error));
  }
};


// to delete properties which is created by user
const deleteProperty = async(req,res)=>{
  // console.log("Deleting properties")
    const { jwt:token } = req.cookies;
    const { id } = req.params


    try {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err,userData) => {
        if (err) throw err;
        const Property = await PropertyModel.findById(id);
        if (userData.userId === Property.owner.toString()) {
          await PropertyModel.findByIdAndDelete(id);
          res.json({ message: "Property deleted successfully" });
        } else {
          return res
           .status(401)
           .json({ message: "Unauthorized to delete property" });
        }
      });
    } catch (error) {
      return res
       .status(400)
       .json(errorHandler(400, "error deleting property", error));
    }
}

// to get properties which is created by user
const getMyProperties = async(req,res)=>{
  console.log("Getting properties")
    const {jwt:token} = req.cookies
    try {
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,userData)=>{
            if(err) throw err
            const properties = await PropertyModel.find({owner:userData.userId})
            return res.status(200).json(properties)
        })
    } catch (error) {
        return res
       .status(400)
       .json(errorHandler(400,"error finding your properties",error))
    }
}

//for showing details of the specific property by the propertyid
const getPropertyById = async(req,res)=>{
    const {id} = req.params
    try {
        const property = await PropertyModel.findById(id)
        res.status(200).json(property)
    } catch (error) {
        return res
       .status(400)
       .json(errorHandler(400,"error finding property by id",error))
    }
 }

export { postProperty, getAllProperties, updateProperty,getMyProperties, deleteProperty, getPropertyById};

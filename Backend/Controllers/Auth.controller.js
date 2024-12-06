import { User } from "../Models/Auth.model.js";
import genrateToken from "../Utillis/genrateToken.js";
import { errorHandler } from "../Utillis/error.js";
import jwt from 'jsonwebtoken';
//register user

const registerUser = async (req, res) => {
  console.log("Register user called"); // Add this line
  try {
    const { username, email, password} = req.body; 
    if (!username || !email || !password) {
      return res.status(400).json(errorHandler(400, "All fields are required"));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json(errorHandler(400, "User already exists"));
    }

    const user = await User.create({ username, email, password,}); 

    if (user) {
      (res, user._id);
      
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        message: "User created successfully"
      });
    } else {
      return res.status(400).json(errorHandler(400, "Invalid user data"));
    }
  } catch (error) {
    console.error("Error in registerUser:", error); // Add this line
    res.status(500).json(errorHandler(500, error.message));
  }
};

//login user
const loginUser = async (req, res) => { // Added async keyword
  // console.log("Login user called"); // Add this line
  try {
    const { email, password } = req.body;

    // console.log(req.body);
    if (!email || !password) {
      return res.status(400).json(errorHandler(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    // console.log("User found:", user); // Add this line

    if (user && (await user.matchPassword(password))) {
      genrateToken(res, user._id);
      return res.status(200).json({ 
        id: user._id,
        email: user.email,
        username: user.username,
        message: "User logged in successfully"
      });
    } else {
      console.log("Invalid email or password"); // Add this line
      return res.status(401).json({ message: "Invalid email or password" }); // Ensure message is sent correctly
    }
  } catch (error) {
    console.error("Error in loginUser:", error); // Add this line
    res.status(500).json(errorHandler(500, error.message));
  }
};

const logoutUser = async(req,res)=>{
    res.cookie("jwt",'',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User logged out successfully"})
}

const getUser = async(req,res)=>{ 
  // console.log("getuser called");
  const jwtSecret = process.env.JWT_SECRET; // Ensure jwtSecret is defined
  const { jwt: token } = req.cookies; // Ensure you're getting the token from cookies
  // console.log(token); // Corrected from jwt to token
  if(!token){
      return res.status(401).json({message:"Token not provided"});
  }

  try {
    const userData = jwt.verify(token, jwtSecret); // Verify token
    // console.log(userData);
    const userProfile = await User.findById(userData.userId); 
    return res.json(userProfile); // Send user profile data
  } catch (err) {
    console.error("Error verifying token:", err); // Log the error for debugging
    return res.status(401).json("Invalid token"); // Send error response if token is invalid
  }
}



export { registerUser, loginUser ,logoutUser,getUser}


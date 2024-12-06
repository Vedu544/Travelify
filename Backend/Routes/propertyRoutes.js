import {
  postProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
} from "../Controllers/property.controller.js";
import express from "express";
import checkToken from "../Middlewares/token.middlware.js";
import {upload} from "../Middlewares/multer.middlware.js"


const router = express.Router();

router.post('/postProperties',checkToken,
  upload.fields([
    {
      name: "photos",
      maxCount: 10,
    }
  ]),
postProperty)
router.put('/updateProperties/:id', checkToken, 
  upload.fields([
    { name: 'photos', maxCount: 10 }
  ]), 
  updateProperty
)
router.delete('/deleteProperties/:id', checkToken, deleteProperty)
router.get('/getAllProperties', getAllProperties)
//by owner user id
router.post('/getMyProperties/:id', checkToken, getMyProperties)
//by property id
router.get('/getProperty/:id', getPropertyById)

export default router;
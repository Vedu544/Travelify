import express from 'express';
import { createPlace,updatePlace,deletePlace,getPlace,getPlaces,getPlacesByCity } from '../Controllers/Place.controller.js';

const router = express.Router()

//by admin
router.post('/createPlace', createPlace);
router.put('/updatePlace/:id', updatePlace);
router.delete('/deletePlace/:id', deletePlace);

//by user
router.get('/getPlaces', getPlaces);
router.get('/getPlace/:id', getPlace);
router.get('/getPlacesByCity/:city', getPlacesByCity);


export default router;
import { SearchByName,SearchSuggestions } from "../Controllers/Search.controller.js";
import express from "express"

const router  = express.Router();

router.post("/searchByName", SearchByName);
router.get("/searchSuggestions", SearchSuggestions);




export default router;
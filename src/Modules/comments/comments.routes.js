import { Router } from "express";
import { Update_Comment, add_comment, delete_Comment, reading_All_Comment } from "./comments.controler.js";
const routes = Router();



routes.post("/add_comment", add_comment)
routes.get("/reading_All_Comment", reading_All_Comment)
routes.put("/Update_Comment/:id", Update_Comment)
routes.delete("/delete_Comment/:id", delete_Comment)



export default routes
import { Router } from "express";
import { add_post, delete_Post, reading_AllPosts, reading_Specific_Posts, specific_post_author, specific_user_specific_posts_comments, specific_user_specific_posts_comments_byName, update_Post } from "./post.controler.js";
const routes = Router();

routes.post("/add_post", add_post)
routes.get("/reading_AllPosts", reading_AllPosts)
routes.get("/reading_Specific_Posts/:id", reading_Specific_Posts)
routes.put("/update_Post/:id", update_Post)
routes.delete("/delete_Post/:id", delete_Post)
routes.get("/specific_post_author/:id", specific_post_author)
routes.get("/specific_user_specific_posts_comments", specific_user_specific_posts_comments)
routes.get("/specific_user_specific_posts_comments2", specific_user_specific_posts_comments_byName)


export default routes;
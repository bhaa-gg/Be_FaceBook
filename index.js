import express from 'express';
import dbConn from './DB/connection.js';
import { user_model } from './DB/Models/User/user.models.js';
import { post_model } from './DB/Models/Posts/post.models.js';
import { comments_model } from './DB/Models/comments/comment.model.js';
import user_Routes from './src/Modules/User/user.routes.js';
import post_Routes from './src/Modules/Posts/post.routes.js';
import comment_routes from './src/Modules/comments/comments.routes.js';
import cors from 'cors';
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/user", user_Routes)
app.use("/post", post_Routes)
app.use("/comment", comment_routes)


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/*', (req, res) => res.send(404))

dbConn;
comments_model;
user_model;
post_model;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
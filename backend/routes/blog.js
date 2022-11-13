import express, { json } from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();

/* GET route for retrieving all blog posts from database */
router.get("/", async (req, res, next) => {
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

/* POST route for creating a blog post and inserting it into database */
router.post("/create-post", async (req, res) => {
  // body should be JSON
  const body = req.body;
  // return error if one of the fields is empty
  if (!body.content.length || !body.title.length) {
    return res.status(400).send();
  }
  // create blog model with the request body
  const blog = new BlogModel({content: body.content, title: body.title});
  // remember to await .save();
  // save to mongodb
  await blog.save();
  // get an object representation and send it back to the client
  return res.send(blog.toObject());
});

export default router;

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

const BLOG_PASSWORD=process.env.BLOG_PASSWORD;

/* POST route for creating a blog post and inserting it into database */
router.post("/create-post", async (req, res) => {
  // body should be JSON
  const body = req.body;
  // return error if the password is incorrect
  if (body.password != BLOG_PASSWORD) {
    return res.status(401).send();
  }
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

router.post("/edit-post", async (req, res) => {
  // body should be JSON
  const body = req.body;
  // return error if the password is incorrect
  if (body.password != BLOG_PASSWORD) {
    return res.status(401).send();
  }
  // return error if one of the fields is empty
  if (!body.content.length || !body.title.length) {
    return res.status(400).send();
  }
  // create blog model with the request body
  const blog = await BlogModel.findOne({title: body.oldTitle});
  console.log
  blog.title = body.title;
  blog.content = body.content;
  // remember to await .save();
  // save to mongodb
  await blog.save();
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

router.post("/delete-post", async(req, res) => {
  const body = req.body;

  await BlogModel.deleteOne({title: body.title});

  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
})

export default router;

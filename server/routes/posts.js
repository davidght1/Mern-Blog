import { Router } from "express";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
} from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create post
//http://localhost:3002/api/auth/posts
router.post("/", checkAuth, createPost);

// Get All posts
//http://localhost:3002/api/auth/posts
router.get("/", getAll);

// Get posts by id
//http://localhost:3002/api/auth/posts/:id
router.get("/:id", getById);

// Get my posts
//http://localhost:3002/api/auth/posts/user/me
router.get("/user/me", checkAuth, getMyPosts);

// Get delete post by id
//http://localhost:3002/api/auth/posts/:id
router.delete("/:id", checkAuth, removePost);

// Get update post by id
//http://localhost:3002/api/auth/posts/:id
router.put("/:id", checkAuth, updatePost);

export default router;

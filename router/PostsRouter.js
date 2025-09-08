import express from 'express';
import {getAllPosts,getPost,createPosts} from '../controllers/postController.js'
const router = express.Router();

router.get("/posts", getAllPosts);
router.get('/posts/:id', getPost);
router.post('/createPosts', createPosts);

export default router;

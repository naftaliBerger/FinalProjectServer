import express from 'express';
import {getAllPosts,getPost,createPosts,updatePosts} from '../controllers/postController.js'
const router = express.Router();

router.get("/posts", getAllPosts);
router.get('/posts/:id', getPost);
router.post('/createPosts', createPosts);
router.put('/updatePosts/:id',updatePosts)
export default router;

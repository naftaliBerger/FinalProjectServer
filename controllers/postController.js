import {getPosts,getPostsById,addPosts,updatePost,deletePost} from '../DAL/dal.js';

export  async function getAllPosts(req,res) {
    const posts = await getPosts();
    res.json(posts);
}

export async function getPost(req, res) {
  const id = Number(req.params.id);
  const post = await getPostsById(id);
  if (!post) return res.status(404).send('post not found');
  res.json(post);
}

export async function createPosts(req, res) {
  const {src, name, description } = req.body;
  if (!src||!name || !description ) {
    return res.status(400).send("Missing fields");
  }
const newPost = await addPosts({ src,name, description});
  res.status(201).json(newPost);
}

export async function updatePosts(req, res) {
  const id = Number(req.params.id);
  
  const { src, name, description } = req.body;
  if (!src||!name || !description) {
    return res.status(400).send("All fields are required");
  }
  const updated = await updatePost(id,{ src,name, description});
  if (!updated) return res.status(404).send("post not found");
  res.json(updated);
  
}

export async function deletePosts(req, res) {
  const id = Number(req.params.id);
  const deleted = await deletePost(id);
  if (!deleted) return res.status(404).send('post not found');
  res.send("deleted");
}
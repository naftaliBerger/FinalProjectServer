import {readFile,writeFile} from 'fs/promises';
const Posts =  './db/db.json'

// Get all posts
export async function getPosts() {
  const data = await readFile(Posts, 'utf8');
  return JSON.parse(data);
}

// Get a post by id
export async function getPostsById(id) {
  const data = await getPosts();
  return data.find(r => r.id === id);
}

// Add
export async function addPosts(newPost) {
  const posts = await getPosts();
  const id = posts.length + 1;
  const date = Date();

  const postToAdd = {id: id,src:newPost.src,name: newPost.name,description: newPost.description,date:date };
  
  posts.push(postToAdd);
  await writeFile(Posts, JSON.stringify(posts, null, 2));
  return postToAdd;
}
//update
export async function updatePost(id, updatedData) {
  const posts = await getPosts();
  const indexA = id;
  const date = Date();

  const index = posts.findIndex(r => r.id === id);
  if (index === -1) return null;

  if (!updatedData.src || !updatedData.name || !updatedData.description) {
    return null;}

  const updatedPost = {id: indexA,src:updatedData.src,name: updatedData.name,description: updatedData.description,date:date};

  posts[index] = updatedPost;
  await writeFile(Posts, JSON.stringify(posts, null, 2));
  return updatedPost;
}
//delete
export async function deletePost(id) {
  const posts = await getPosts();
  const updatedPost = posts.filter(r => r.id !== id);

  await writeFile(Posts, JSON.stringify(updatedPost, null, 2));
  return true;
}
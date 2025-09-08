import {readFile,writeFile} from 'fs/promises';
const Posts =  './db/db.json'

export async function getPosts() {
  const data = await readFile(Posts, 'utf8');
  return JSON.parse(data);
}

export async function getPostsById(id) {
  const data = await getPosts();
  return data.find(r => r.id === id);
}

export async function addPosts(newPost) {
  const posts = await getPosts();
  const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
  const date = Date();

  const postToAdd = {id: id,name: newPost.name,description: newPost.description,date:date };
    
  posts.push(postToAdd);
  await writeFile(Posts, JSON.stringify(posts, null, 2));
  return postToAdd;
}
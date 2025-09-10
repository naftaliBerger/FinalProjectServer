import {  getAllPlayers,  insertPlayer,  updatePlayerById,  getUserByUsername,  checkPassword,updatePlayerByUsername} from "../DAL/userDal.js";

import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
//--------------------------------------------
export async function getPlayers(req, res) {
  const { data, error } = await getAllPlayers();
  if (error) return res.status(500).json({ error: "failed to get players" });
  res.json(data);
}
//--------------------------------------------
export async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username and password required" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await insertPlayer({username,password: hashedPassword
    });
    if (error) {
      // console.error("Supabase Insert Error:", error); 
      return res.status(500).json({ error: "failed to register user" });
    }
    res.status(201).json({ message: "user registered" });
  } catch (e) {
    console.error("General Error:", e);
    res.status(500).json({ error: "failed to register user" });
  }
}
//--------------------------------------------
export async function login(req, res) {
  const { username, password } = req.body;
  const { data: user, error } = await getUserByUsername(username);
  console.log(user, error);
  
  if (error || !user) return res.status(403).json({ error: "User not found" });

  const match = await checkPassword(password, user.password);
  if (!match) return res.status(403).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "50d" }
  );

  res.json({ token });
}
//--------------------------------------------
export async function updatePlayer(req, res) {
  const id = req.params.id;
  const { data, error } = await updatePlayerById(id, req.body);
  if (error) return res.status(500).json({ error: "failed to update player" });
  res.json({ message: "player updated successfully" });
}











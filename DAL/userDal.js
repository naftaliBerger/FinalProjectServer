import Supabase from "../db/supabaseDB.js";
import bcrypt from "bcrypt";

//--------------------------------------------
// DAL function to fetch all players from the "Player" table
export async function getAllPlayers() {
    return await Supabase.from("postUsers").select("*");
}

//--------------------------------------------
// DAL function to insert a new player into the "Player" table
export async function insertPlayer(playerData) {
    return await Supabase.from("postUsers").insert([playerData]);
}

//--------------------------------------------
// DAL function to update an existing player by ID in the "Player" table
export async function updatePlayerById(id, playerData) {
    return await Supabase.from("postUsers").update(playerData).eq("id", id).select().single();     
}
//--------------------------------------------
export async function getUserByUsername(username) {
  const { data, error } = await Supabase.from("postUsers").select("*").eq("username", username).limit(1).single();
  return { data, error };
}
//--------------------------------------------
export async function checkPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
//--------------------------------------------
export async function updatePlayerByUsername(username, updateFields) {
  try {
    const { data, error } = await Supabase.from("postUsers").update(updateFields).eq("username", username).select();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

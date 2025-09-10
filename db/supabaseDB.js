import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();
const Supabase = createClient(process.env.DB_URL, process.env.BD_SECRET_KEY);

export default Supabase;
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kuakipejgcswldtiefvb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YWtpcGVqZ2Nzd2xkdGllZnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NzY5NDMsImV4cCI6MjAyODM1Mjk0M30.lAQm0pdrj9edzirTUmLomUqh8rBnsWpNQVR0wNWbdKA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

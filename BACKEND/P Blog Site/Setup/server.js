// server.js
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const PORT = 3000;

app.use(express.json());

const supabaseUrl = 'https://juromwzgqjqiscvtjtbf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cm9td3pncWpxaXNjdnRqdGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTA0MzMsImV4cCI6MjA2Mjg2NjQzM30.nppnTFNteK9sSsK8ukON41i13Kjm79u1ItSGHdC4IMY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a new blog
app.post("/api/blogs", async (req, res) => {
  const { title, content, author } = req.body;

  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, author }]);

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

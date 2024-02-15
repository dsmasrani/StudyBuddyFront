// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./supabaseConnect";
import { updateProfile, getProfileByUserId } from './models/postgres/profile';
import { Profile } from './models/profile';

// app.get() statements below...


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// GET route to retrieve a profile by user ID
app.get("/api/profile/:userid", async (req: Request, res: Response) => {
  const { userid } = req.params;
  try {
    const profile = await getProfileByUserId(userid);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/api/updateProfile/:userid/:id", async (req: Request, res: Response) => {
  const { userid, id } = req.params;
  const parsedId = parseInt(id, 10); // Parse id as an integer
  const profile: Profile = req.body; // Assuming you are sending the profile data in the request body
  try {
    const insertedProfile = await updateProfile(profile, userid, parsedId);
    if (insertedProfile) {
      res.status(201).json(insertedProfile); // Return the inserted profile
    } else {
      res.status(400).send('Bad Request'); // Or handle the error accordingly
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// POST route to create a new profile (Will be using OAuth)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
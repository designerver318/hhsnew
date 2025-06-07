// scripts/seedAdmin.js
import { dbConnect } from "../lib/mongoose.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

await dbConnect();

const username = "adminhhsjune2025";
const plainPassword = "e&a*JbDt";

const hashedPassword = await bcrypt.hash(plainPassword, 10);

await Admin.deleteMany({ username }); // Optional: cleanup old entry

const newAdmin = new Admin({ username, password: hashedPassword });
await newAdmin.save();

console.log("✅ Admin seeded with hashed password");

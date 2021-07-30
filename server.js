// Get npm packages
import Express from "express";
import DotEnv from "dotenv";

// Get enviroment variables
DotEnv.config();

// Declare variables
const PORT = process.env.PORT || 5771;

// Run server
const app = Express();
app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

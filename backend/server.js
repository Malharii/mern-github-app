import express from "express";
import userRoutes from "./routes/user.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("server is ready ");
});

dotenv.config();

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));

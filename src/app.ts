import express from "express";
import flowdeskRoutes from "./routes/flowdeskRoutes";

const app = express();
app.use(express.json());

// --- ADDITIONAL ROUTES ---
app.use("/flowdesk", flowdeskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorMiddleware} from "./middlewares/errorMiddleware.js";
import codeRoutes from "./routes/codeRoutes.js";

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// Routes
app.use("/compile", codeRoutes);

// Global error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

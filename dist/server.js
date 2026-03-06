import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));

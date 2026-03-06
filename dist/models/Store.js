import mongoose from "mongoose";
const storeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        detail: { type: String, required: true }
    }
}, { timestamps: true });
export default mongoose.model("Store", storeSchema);

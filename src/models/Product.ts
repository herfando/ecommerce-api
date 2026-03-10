import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    date: String,
    reviewerName: String,
    reviewerEmail: String
});

const dimensionsSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    depth: Number
});

const metaSchema = new mongoose.Schema({
    createdAt: String,
    updatedAt: String,
    barcode: String,
    qrCode: String
});

const imageSchema = new mongoose.Schema({
    thumbnail: String
});

const productSchema = new mongoose.Schema({

    id: Number,

    title: {
        type: String,
        required: true
    },

    description: String,

    category: String,

    price: {
        type: Number,
        required: true
    },

    discountPercentage: Number,

    rating: Number,

    stock: Number,

    tags: [String],

    brand: String,

    sku: String,

    weight: Number,

    dimensions: dimensionsSchema,

    warrantyInformation: String,

    shippingInformation: String,

    availabilityStatus: String,

    reviews: [reviewSchema],

    returnPolicy: String,

    minimumOrderQuantity: Number,

    meta: metaSchema,

    images: [imageSchema]

}, { timestamps: true });


export default mongoose.model("Product", productSchema);
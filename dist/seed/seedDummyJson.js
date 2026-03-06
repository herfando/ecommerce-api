import 'dotenv/config';
import { MongoClient } from 'mongodb';
const uri = process.env.MONGO_URI;
if (!uri)
    throw new Error("Please add MONGO_URI to .env.local");
const client = new MongoClient(uri);
async function seed() {
    try {
        await client.connect();
        const db = client.db("ecommerce");
        const collection = db.collection("products");
        await collection.deleteMany({});
        // ✅ pakai fetch bawaan Node
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        const result = await collection.insertMany(data.products);
        console.log(`${result.insertedCount} products inserted into MongoDB Atlas!`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}
seed();

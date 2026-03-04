import fetch from 'node-fetch';
import { MongoClient, Collection } from 'mongodb';

const uri: string | undefined = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

const client = new MongoClient(uri);

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

async function seed() {
    try {
        await client.connect();
        const db = client.db("ecommerce");
        const collection: Collection<Product> = db.collection("products");

        // Optional: bersihkan collection dulu
        await collection.deleteMany({});

        // Fetch data DummyJSON
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = (await res.json()) as { products: Product[] };
        const products = data.products;

        // Insert semua produk ke MongoDB Atlas
        const result = await collection.insertMany(products);
        console.log(`${result.insertedCount} products inserted into MongoDB Atlas!`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seed();
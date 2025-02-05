const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const client = new MongoClient(process.env.URI);
const dbName = "myDatabase"; // Change to your database name

async function connectDb() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

// ✅ Insert a document
async function insertDocument(collectionName, document) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        // console.log("Document inserted:", result.insertedId);
        return result;
    } catch (error) {
        console.error(" Error inserting document:", error.message);
    }
}

// ✅ Find all documents
async function findDocuments(collectionName) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find().toArray();
        return result;
    } catch (error) {
        console.error("❌ Error finding documents:", error.message);
    }
}

// ✅ Find a document by ID
async function findDocumentById(collectionName, id) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error("❌ Error finding document by ID:", error.message);
    }
}

// ✅ Update a document by ID
async function updateDocument(collectionName, id, updateData) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        return result;
    } catch (error) {
        console.error("❌ Error updating document:", error.message);
    }
}

// ✅ Delete a document by ID
async function deleteDocument(collectionName, id) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error("❌ Error deleting document:", error.message);
    }
}

module.exports = {
    connectDb,
    insertDocument,
    findDocuments,
    findDocumentById,
    updateDocument,
    deleteDocument
};

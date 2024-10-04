import { InsertOneResult, MongoClient, ObjectId } from "mongodb";
import { User } from './types'
const config = require('../dbconfig.json');
const url: string = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client: MongoClient = new MongoClient(url);

// Adds user to database
export async function addUser(user: User): Promise<string | null> {
    try {
        await client.connect();
        const database = client.db('users');
        const collection = database.collection('users');
        const result: InsertOneResult = await collection.insertOne(user);
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error adding user:', error);
        return null;
    } finally {
        await client.close();
    }
}
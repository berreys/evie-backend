import { InsertOneResult, WithId, MongoClient, ObjectId } from "mongodb";
import { User } from './types'
// const config = require('../dbconfig.json');
const url: string = `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.hostname}`;
const client: MongoClient = new MongoClient(url);

// Adds user to database
export async function addUser(user: User): Promise<string | null> {
    try {
        await client.connect();
        const database = client.db('users');
        const collection = database.collection('users');
        const result: InsertOneResult = await collection.insertOne(user);
        return result.insertedId.toString();
    }
    catch (error) {
        console.error('Error adding user:', error);
        return null;
    }
    finally {
        await client.close();
    }
}

// Gets user from database
export async function getUser(username: string): Promise<User | null> {
    try {
        await client.connect();
        const database = client.db('users');
        const collection = database.collection('users');
        const result = await collection.findOne({username: username});
        console.log(result);
        return null;
    }
    catch (error) {
        console.error("Error retrieving user:', error");
        return null;
    }
    finally {
        await client.close();
    }
}
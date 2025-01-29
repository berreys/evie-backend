import { User } from './types';
import sql, { QueryOptions } from 'mysql2';

const config = {
    user: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_name,
    host: process.env.db_server
};

async function executeQuery(query: QueryOptions) {
    let connection = null;
    try {
        connection = await sql.createConnection(config);
        connection.connect((err) => {
            if(err){
                console.error('Error connecting to database:', err.message);
                return;
            }
            console.log('Connected to database.');
        })
        connection.query(query, (err, results) => {
            if(err){
                console.error('Error executing query:', err.message);
                return;
            }
            console.log('Query results:', results);
        })
    }
    catch (error) {
        console.error('Error adding user:', error);
    }
    finally {
        if(connection){
            await connection.end();
            console.log('Database connection closed.');
        }
    }
}

// Adds user to database
export async function addUser(user: User) {
    await executeQuery({'sql': 'SELECT * FROM test;'});
}

// Gets user from database
export async function getUser(username: string): Promise<User | null> {
    // try {
    //     await client.connect();
    //     const database = client.db('users');
    //     const collection = database.collection('users');
    //     const result = await collection.findOne({username: username});
    //     console.log(result);
    //     return null;
    // }
    // catch (error) {
    //     console.error("Error retrieving user:', error");
    //     return null;
    // }
    // finally {
    //     await client.close();
    // }
    return null
}
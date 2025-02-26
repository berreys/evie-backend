import { User } from './types';
import sql, { QueryOptions, QueryResult, ResultSetHeader } from 'mysql2/promise';

const config = {
    user: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_name,
    host: process.env.db_server
};

// Adds user to database
export async function addUser(user: User) {
    let connection = null;
    let res = null;
    try {
        connection = await sql.createConnection(config);

        // Insert user into account table
        let query = 'INSERT INTO account (firstName, lastName, username, passwordHashed, email, createdAt) VALUES (?, ?, ?, ?, ?, NOW());';
        let values = [user.firstName, user.lastName, user.username, user.password, user.email]
        const insertRes: any = await connection.execute(query, values);

        // Retrieve user's row from account table that we just inserted
        query = 'SELECT * FROM account WHERE id = ?;';
        values = [insertRes[0].insertId];
        const rows: any = await connection.execute(query, values);

        // Insert user's ID into chargerowner table if they own a charger
        if(user.chargerOwner){
            query = 'INSERT INTO chargerowner (accountId) VALUES (?);';
            values = [insertRes[0].insertId];
            await connection.execute(query, values);
        }

        // Insert user's ID into vehicleowner if they own a vehicle
        if(user.vehicleOwner){
            query = 'INSERT INTO vehicleowner (accountId) VALUES (?);';
            values = [insertRes[0].insertId];
            await connection.execute(query, values);
        }

        res = rows[0];

    }
    catch (error) {
        console.error('Error adding user:', error);
        return {error: error};
    }
    finally {
        if(connection){
            await connection.end();
            console.log('Database connection closed.');
        }
        return res;
    }
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
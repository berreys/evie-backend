import { User, UserLogin } from './types';
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

export async function login(credentials: UserLogin) {
    // TODO: check that username and password match. Return true if credentials are valid, else return false
    return null;
}

export async function addCharger() {
    // TODO: add a charger to the database. Ensure it is properly associated with the user. Params to this function also need to be defined.
    return null;
}

export async function getChargers() {
    // TODO: get all the chargers from the database and return them in a list. Params to this function also need to be defined.
    return null;
}
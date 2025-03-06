import { Availability, User, UserLogin } from './types';
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
            const chargerOwnerInsertRes: any = await connection.execute(query, values);
            query = 'INSERT INTO address (zip, state, city, addressLine1, addressLine2) VALUES (?, ?, ?, ?, ?);';
            values = [
                user.zip ? user.zip : "", 
                user.state ? user.state : "",
                user.city ? user.city : "",
                user.addrLine1 ? user.addrLine1 : "",
                user.addrLine2 ? user.addrLine2 : ""
            ];
            const addressInsertRes: any = await connection.execute(query, values);
            query = 'INSERT INTO charger (addressId) VALUES (?);';
            values = [addressInsertRes[0].insertId];
            const chargerInsertRes: any = await connection.execute(query, values);
            query = 'INSERT INTO chargerowner_charger (chargerownerid, chargerid) VALUES (?, ?);';
            values = [chargerOwnerInsertRes[0].insertId, chargerInsertRes[0].insertId];
            await connection.execute(query, values);
        }

        // Insert user's ID into vehicleowner if they own a vehicle
        if(user.vehicleOwner){
            query = 'INSERT INTO vehicleowner (accountId) VALUES (?);';
            values = [insertRes[0].insertId];
            const vehicleOwnerInsertRes: any = await connection.execute(query, values);
            query = 'INSERT INTO vehicle (make, model, color, licensePlateNumber, licensePlateState) VALUES (?, ?, ?, ?, ?);';
            values = [
                user.make ? user.make : "",
                user.model ? user.model : "",
                user.color ? user.color : "",
                user.plateNumber ? user.plateNumber : "",
                user.plateState ? user.plateState : ""
            ];
            const vehicleInsertRes: any = await connection.execute(query, values);
            query = 'INSERT INTO vehicleowner_vehicle (vehicleOwnerId, vehicleId) VALUES (?, ?);';
            values = [vehicleOwnerInsertRes[0].insertId, vehicleInsertRes[0].insertId];
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
    console.log(credentials);
    let connection = null;
    let res: any = null;
    try {
        connection = await sql.createConnection(config);

        // Find the data for the given username
        let query = 'SELECT * FROM account WHERE username = ?;';
        let values = [credentials.username];
        res = await connection.execute(query, values);
        const user = res[0][0];

        // Throw error if username invalid
        if(!user) {
            throw Error("No such username.");
        }

        // Find what type of account the user has
        query = 'SELECT * FROM account a INNER JOIN chargerowner c ON a.id = c.accountId WHERE a.username = ?;'
        values = [credentials.username];
        res = await connection.execute(query, values);

        if(res[0][0]) {
            user["chargerOwner"] = true;
            user["vehicleOwner"] = false;
        }
        // Assume if they aren't charger owner, they are vehicle owner
        else {
            user["chargerOwner"] = false;
            user["vehicleOwner"] = true;
        }

        if(connection){
            await connection.end();
            console.log('Database connection closed.');
        }
        return user;
    }
    catch (error) {
        console.error('Error logging in:', error);
        if(connection){
            await connection.end();
            console.log('Database connection closed.');
        }
        return {error: error};
    }
}


export async function getChargers() {
    let connection = null;
    let res: any = null;
    try {
        connection = await sql.createConnection(config);

        // Insert user into account table
        let query = 'SELECT * FROM charger c INNER JOIN address a ON c.addressId = a.id;';
        res = await connection.execute(query);
    }
    catch (error) {
        console.error('Error retrieving chargers:', error);
        return {error: error};
    }
    finally {
        if(connection){
            await connection.end();
            console.log('Database connection closed.');
        }
        return res[0];
    }
}

export async function addAvailability(availability: Availability) {
    let connection = null;
    let res = null;
    try {
        connection = await sql.createConnection(config);

        // Insert user into availability table
        let query = 'INSERT INTO chargeravailability (chargerId, startDateTime, endDateTime) VALUES (?, ?, ?);';
        let values = [availability.chargerId, availability.startTime, availability.endTime];
        const insertRes: any = await connection.execute(query, values);
        res = insertRes[0].insertId;
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

export async function addReservation() {
    // TODO: add a reservation for a charger and user
    // Params to this function also need to be defined.
    return null;
}

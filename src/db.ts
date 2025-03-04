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
    // TODO: check that username and password match. Return true if credentials are valid, else return false
    return null;
}

export async function addCharger() {
    // TODO: add a charger to the database. Ensure it is properly associated with the user.
    // Params to this function also need to be defined.
    return null;
}

export async function getChargers() {
    // TODO: get all the available chargers from the database and return them in a list.
    // Params to this function also need to be defined.
    return null;
}

export async function addAvailability() {
    // TODO: add a time slot for a charger during which it can be rented
    // Params to this function also need to be defined.
    return null;
}

export async function addReservation() {
    // TODO: add a reservation for a charger and user
    // Params to this function also need to be defined.
    return null;
}

export async function addCar() {
    // TODO: add a vehicle for a user into the DB
    // Params to this function also need to be defined.
    return null;
}
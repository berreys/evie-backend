export interface User {
    firstName: String;
    lastName: String;
    email: String;
    username: String;
    password: String;
    chargerOwner: boolean;
    vehicleOwner: boolean;
}

export interface UserLogin {
    username: String;
    password: String;
}
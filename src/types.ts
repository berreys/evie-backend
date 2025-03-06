export interface User {
    firstName: String;
    lastName: String;
    email: String;
    username: String;
    password: String;
    chargerOwner: boolean;
    vehicleOwner: boolean;

    addrLine1?: String;
    addrLine2?: String;
    city?: String;
    state?: String;
    zip?: String

    make?: String;
    model?: String;
    color?: String;
    plateNumber?: String;
    plateState?: String;
}

export interface UserLogin {
    username: String;
    password: String;
}

export interface Availability {
    chargerId: Number;
    startTime: String; //ISO format
    endTime: String; //ISO format
}

export interface Reservation {
    chargerId: Number;
    startTime: String;
    endTime: String;
    driverUsername: String;
}

export interface GetAppointmentsData {
    username: String;
    isChargerOwner: Boolean;
}
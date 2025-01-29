DROP TABLE IF EXISTS VehicleOwner_Vehicle;
DROP TABLE IF EXISTS VehicleOwner;
DROP TABLE IF EXISTS ChargerOwner;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS ChargerAvailability;
DROP TABLE IF EXISTS Charger;
DROP TABLE IF EXISTS Address;

CREATE TABLE Account(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    passwordHashed VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VehicleOwner(
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountId INT NOT NULL,
    FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE TABLE ChargerOwner(
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountId INT NOT NULL,
    FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE TABLE Vehicle(
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    licensePlateNumber VARCHAR(50) NOT NULL,
    licensePlateState VARCHAR(50) NOT NULL,
    UNIQUE (licensePlateNumber, licensePlateState)
);

CREATE TABLE VehicleOwner_Vehicle(
    vehicleOwnerId INT,
    vehicleId INT,
    PRIMARY KEY (vehicleOwnerId, vehicleId),
    FOREIGN KEY (vehicleOwnerId) REFERENCES VehicleOwner(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicleId) REFERENCES Vehicle(id) ON DELETE CASCADE
);

CREATE TABLE Address(
    id INT AUTO_INCREMENT PRIMARY KEY,
    zip VARCHAR(5) NOT NULL,
    state VARCHAR(12) NOT NULL,
    city VARCHAR(50) NOT NULL,
    addressLine1 VARCHAR(255) NOT NULL,
    addressLine2 VARCHAR(255) NOT NULL
);

CREATE TABLE Charger(
    id INT AUTO_INCREMENT PRIMARY KEY,
    addressId INT,
    FOREIGN KEY (addressId) REFERENCES Address(id)
);

CREATE TABLE ChargerAvailability(
    id INT AUTO_INCREMENT PRIMARY KEY,
    chargerId INT NOT NULL,
    startDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    endDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
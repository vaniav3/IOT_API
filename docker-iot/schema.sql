CREATE TABLE Admin (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Company (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255),
    company_api_key VARCHAR(255)
);

CREATE TABLE Location (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    location_name VARCHAR(255),
    location_country VARCHAR(255),
    location_city VARCHAR(255),
    location_meta VARCHAR(255),
    FOREIGN KEY(company_id) REFERENCES Company(ID)
);

CREATE TABLE Sensor (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    location_id INT,
    sensor_name VARCHAR(255),
    sensor_category VARCHAR(255),
    sensor_meta VARCHAR(255),
    sensor_api_key VARCHAR(255),
    FOREIGN KEY(location_id) REFERENCES Location(ID)
);

CREATE TABLE SensorData (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    sensor_id INT,
    humidity INT,
    temperature INT,
    solar_radiation INT,
    solar_heat INT,
    create_date DATETIME,
    FOREIGN KEY(sensor_id) REFERENCES Sensor(ID)
);

ALTER TABLE Company ADD INDEX idx_company_api_key (company_api_key);
ALTER TABLE Sensor ADD INDEX idx_sensor_api_key (sensor_api_key);

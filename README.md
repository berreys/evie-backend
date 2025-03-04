# evie-backend
Node.js/TypeScript backend service for Evie's mobile app

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running Locally](#running-locally)
4. [Deploying](#deploying)

## Introduction
Evie is an application that connects EV owners and EV charger owners

## Installation

#### 1. Clone the repository
```
git clone https://github.com/berreys/evie-backend.git
```

#### 2. Install node dependencies
```
npm install
```

## Running Locally

Install and set up a database with MySQL workbench. 

Create a file in the root directory called ```.env```. Add the following contents, using your credentials from MySQL workbench:

```
db_username: root
db_password: password123
db_name: evie
db_server: localhost

```

To run with live updating: ```npm run dev```

To run without live updating: ```npm start```

To build into JS code: ```npm run build```

To run with compiled JS code: ```npm run serve```

## Deploying

There is no deployed environment yet for this project.
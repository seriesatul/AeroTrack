# AeroTrack – Real-Time Telemetry Dashboard

AeroTrack is a full-stack web application designed to monitor real-time aircraft telemetry. It features a live-updating dashboard with a map display, built with a modern tech stack including Node.js, MongoDB, React, and TypeScript.

[](https://aerotrack-dashboard.netlify.app/)
_Live Demo: [https://aerotrack-dashboard.netlify.app/](https://aerotrack-dashboard.netlify.app/)_
_(Note: The free-tier backend may take 30-60 seconds to "wake up" on the first visit.)_

## Features

-   **Real-Time Data Streaming:** Utilizes WebSockets for instant, low-latency updates from the server to the client without polling.
-   **Live Map Visualization:** Displays the aircraft's current position on an interactive map, which pans to follow the aircraft in real-time.
-   **Dynamic Dashboard:** Shows key telemetry data (Altitude, Speed, Heading, etc.) that updates instantly as new data arrives.
-   **Scalable Backend:** Built with Node.js and Express, designed to handle high-frequency data ingestion.
-   **Time-Series Database:** Leverages MongoDB to efficiently store and query time-series telemetry data.
-   **Modern Frontend:** A type-safe and component-based frontend built with React and TypeScript.
-   **Decoupled Architecture:** A standalone simulator generates telemetry, allowing for independent development and testing of the backend and frontend.

## Tech Stack

| Area      | Technology                                    |
| --------- | --------------------------------------------- |
| **Backend** | Node.js, Express, WebSocket (`ws`), Mongoose  |
| **Frontend**| React, TypeScript, React Leaflet              |
| **Database**| MongoDB (via MongoDB Atlas)                   |
| **DevOps**  | GitHub, Render (Backend), Netlify (Frontend)  |

## Project Architecture

The application is composed of three main services:

1.  **Simulator:** A Node.js script that simulates aircraft telemetry and sends it to the backend via an HTTP POST request every few seconds.
2.  **Backend Server:** An Express server that:
    -   Receives telemetry data via a REST API endpoint.
    -   Stores the data in a MongoDB database.
    -   Broadcasts the new data to all connected clients in real-time using WebSockets.
    -   Provides an API to fetch the latest data for an aircraft.
3.  **Frontend:** A React/TypeScript single-page application that:
    -   Establishes a WebSocket connection to the backend.
    -   Listens for incoming data and updates the application's state.
    -   Renders the live telemetry data and the moving aircraft on the map.



## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v16 or later)
-   npm
-   Git
-   A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a connection string.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/AeroTrack.git
    cd AeroTrack
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb+srv://<user>:<password>@cluster...
    ```

3.  **Setup the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Setup the Simulator:**
    ```bash
    cd ../simulator
    npm install
    ```

### Running the Application

You will need to run all three parts of the application in separate terminals.

1.  **Start the Backend Server:**
    *(In the `backend` directory)*
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3001`.

2.  **Start the Frontend Application:**
    *(In the `frontend` directory)*
    ```bash
    npm start
    ```
    The React app will open in your browser at `http://localhost:3000`.

3.  **Start the Data Simulator:**
    *(In the `simulator` directory)*
    ```bash
    node index.js
    ```
    The simulator will now begin sending data to your local backend server, and you will see the dashboard update in real-time.

## Deployment

This project is deployed with a CI/CD pipeline using GitHub, Render, and Netlify.

-   **Backend (Node.js):** Deployed as a Web Service on **Render**. The service is configured to use the `backend` directory as its root and connects to a MongoDB Atlas database.
-   **Frontend (React):** Deployed as a static site on **Netlify**. The service is configured to use the `frontend` directory as its base and points to the live backend URL via an environment variable.

The live application demonstrates a fully operational, deployed full-stack system.

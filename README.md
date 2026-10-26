## Primetime Moments
A full-stack web application and marketplace where sports fans can explore, bid on, purchase, and list iconic playoff moments artwork, complete with secure user authentication and dynamic database management.

## Live Demo
Render Deployment: https://primetime-moments.onrender.com/signup

## Features
User Authentication: Secure local login and registration powered by Passport.js, featuring session management and flash messaging for error handling.

Interactive Marketplace: Browse iconic sports moments complete with player names, dates, sport classifications, descriptions, current bid history, and "Buy Now" pricing.

Dynamic Bidding System: Place live bids on specific moments that instantly update and persist in the database.

Moment Creation & Purchasing: Submit new iconic sports moments for sale via form submission, or complete purchases to remove sold items from active listings.

REST API Endpoints: Public JSON endpoints for programmatic access to iconic moment data.

Protected Routes: Middleware (isLoggedIn) ensures sensitive dashboard views and actions are restricted to authenticated users.

## API Routes & Endpoints
GET / — Renders the main dashboard with all active iconic moments (requires authentication).

GET /login — Renders the user login form with flash message support.

POST /login — Authenticates user credentials via Passport local strategy.

GET /signup — Renders the new user registration form.

POST /signup — Registers a new user account.

GET /api/iconicMoment — Returns a JSON array containing all moments in the database.

POST /addMoment — Submits new moment data (Image, Player Name, Date, Moment, Sport, Description, Buy Now price) to MongoDB.

PUT /addBid — Pushes a new bid onto an existing moment's bid array.

DELETE /sold — Removes a purchased moment from the active inventory.

## How It Works
Authentication Flow: Users must sign up or log in before accessing the marketplace dashboard, with sessions managed securely through Express session middleware.

Database Persistence: Mongoose connects to MongoDB to store and retrieve moment documents and bids asynchronously.

Client-Server Communication: Client-side scripts interact with backend routes via asynchronous requests to handle dynamic bids and purchases smoothly.

## How to Set Up
Prerequisites
Node.js installed on your machine

A MongoDB database connection URI

## Installation
Clone the repository:
git clone https://github.com/your-username/your-repo-name.git

Navigate into the project folder:
cd your-repo-name

Install dependencies:
npm install

Configure Environment Variables:
Create a .env file in the root directory and add your MongoDB connection string:
MONGODB_URI=your_mongodb_connection_string
PORT=8080

Run the application:
npm start

The server will start on http://localhost:8080 (or your configured port).

Built With
Node.js

Express.js

MongoDB & Mongoose

Passport.js (Local Authentication)

Express Session & Connect Flash

EJS (Embedded JavaScript Templating)

HTML5 & CSS3



<img width="2527" height="1311" alt="image" src="https://github.com/user-attachments/assets/d173c161-6413-45bf-9fe4-7606540292f8" />

**🌱 EcoBuy – Sustainable Shopping Tracker**

EcoBuy is a modern, React-based web application designed to help users log their eco-friendly purchases and visualize their positive environmental impact. Built with a modular architecture and powered by a JSON Server REST API, EcoBuy offers full CRUD operations and real-time sustainability analytics.







**🚀 Features**


📘 1. Purchases Module (Full CRUD)

A complete data-management workflow for eco-friendly shopping.

Add Purchase (POST): Log items with product name, category (Organic / Recycled / Plastic-Free), carbon saved (kg), and purchase date.

View Purchases (GET): Display all entries as responsive cards showcasing product info and carbon impact.

Edit Purchase (PUT): Modify existing data through an elegant modal form.

Delete Purchase (DELETE): Remove items confidently with confirmation prompts.



📊 2. Impact Module (Analytics)

Real-time environmental insights that motivate sustainable choices.

Monthly Carbon Summary – Auto-aggregates carbon saved in the current month.

Displays simple, encouraging messages like:

“You saved 12.7 kg of carbon this month!”



🛠 Tech Stack

Frontend: React.js

Backend Simulation: JSON Server (REST API)

Data Handling: Fetch API / Axios

UI: Modern, responsive layout with reusable components

🎯 What This Project Demonstrates

Complete CRUD implementation using a REST API

Component-based architecture & clean state management

Real-time analytics with computed data

User-focused design around sustainability

## 📎 Setup Instructions

```bash
# Clone the repository
git clone <repo-url>

# Navigate into the project directory
cd ecobuy

# Install dependencies
npm install

# Start the JSON Server (runs on port 3000)
json-server --watch db.json --port 3000

# Start the React app
npm start




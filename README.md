# Online Election Platform

A web-based platform for conducting online elections and surveys using Node.js, Express, and EJS.

## Prerequisites

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`
   - Should show v16.x or higher

## Step-by-Step Setup Guide

1. **Get the Code**
   ```bash
   # Clone or download the project to your computer
   cd C:\Users\arjit\CascadeProjects
   # You should see the online-election-platform-node folder
   ```

2. **Install Dependencies**
   ```bash
   # Navigate to project directory
   cd online-election-platform-node

   # Install required packages
   npm install
   ```

3. **Start the Server**
   ```bash
   # Start the application
   node server.js
   ```

4. **Access the Application**
   - Open your web browser
   - Go to: http://localhost:3000
   - You should see the election platform homepage

## Using the Application

1. **Create an Election**
   - Click "Create Election" button
   - Fill in:
     - Title
     - Description
     - Start Date
     - End Date
   - Click Submit

2. **Add Candidates**
   - Click on an election
   - Click "Add Candidate" button
   - Enter candidate details:
     - Name
     - Description
   - Click Submit

3. **Voting**
   - Click on an election
   - Click "Vote" button
   - Select a candidate
   - Submit your vote

4. **View Results**
   - Click on an election
   - Click "Results" button
   - See vote counts and percentages

## Troubleshooting

1. **Port Already in Use**
   ```bash
   # Kill existing Node.js processes
   taskkill /F /IM node.exe
   # Then start the server again
   node server.js
   ```

2. **Missing Dependencies**
   ```bash
   # Reinstall dependencies
   npm install
   ```

3. **Cannot Find Module Error**
   - Make sure you're in the correct directory
   - Try deleting node_modules folder and package-lock.json
   - Run `npm install` again

## Project Structure

```
online-election-platform-node/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── views/             # EJS templates
│   ├── layout.ejs     # Main layout template
│   ├── index.ejs      # Homepage
│   └── elections/     # Election-related views
│       ├── list.ejs   # List of elections
│       ├── new.ejs    # Create election form
│       ├── view.ejs   # Election details
│       └── vote.ejs   # Voting interface
└── public/            # Static files (CSS, JS)
```

## Features

- Create and manage elections
- Add candidates to elections
- Vote in active elections
- View real-time results
- Responsive design using Bootstrap

## Technology Stack

- Node.js & Express (Backend)
- EJS (Templating)
- Bootstrap (Frontend)
- Express Session (Session Management)

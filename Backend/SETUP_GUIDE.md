# Ardhnarishwar Backend Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/atlas/database
2. Click "Try Free" to create a free account
3. Verify your email and log in

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select a provider (AWS is recommended) and region closest to you
4. Click "Create"

## Step 3: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username (e.g., `ardhnarishwar_admin`)
4. Create a strong password (copy it - you'll need it!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Whitelist IP Address

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

Example:
```
mongodb+srv://ardhnarishwar_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ardhnarishwar?retryWrites=true&w=majority
```

## Step 6: Update .env File

1. Open `server/.env`
2. Replace the entire MONGODB_URI line with your connection string

## Step 7: Install Dependencies & Start

```bash
cd server
npm install
npm run dev
```

## Step 8: Seed Data

Once the server is running, seed the database:

```bash
# Seed companies
curl -X POST http://localhost:5001/api/companies/seed

# Seed jobs
curl -X POST http://localhost:5001/api/jobs/seed
```

## Verify Backend is Working

Visit: http://localhost:5001/api/jobs

You should see JSON data with jobs if everything is configured correctly.

# Appwrite Integration Setup Guide

This guide will help you set up Appwrite for your backend.

## Prerequisites

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io) or set up a self-hosted instance
2. Create a new project in Appwrite

## Step 1: Get Your Appwrite Credentials

1. Go to your Appwrite project dashboard
2. Navigate to **Settings** → **API Keys**
3. Create a new API key with the following scopes:
   - databases.read
   - databases.write
   - storage.read
   - storage.write
   - users.read
   - users.write
4. Copy the following values:
   - **Endpoint**: Usually https://cloud.appwrite.io/v1 (or your self-hosted URL)
   - **Project ID**: Found in Settings → General
   - **API Key**: The key you just created

## Step 2: Create Environment Variables

Create a .env file in the root of your project with the following:

env
# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here

# Appwrite Database IDs (you'll create these in the next steps)
APPWRITE_DATABASE_ID=your_database_id_here

# Appwrite Collection IDs
APPWRITE_COLLECTION_USERS_ID=your_users_collection_id
APPWRITE_COLLECTION_PROJECTS_ID=your_projects_collection_id
APPWRITE_COLLECTION_TEAMS_ID=your_teams_collection_id
APPWRITE_COLLECTION_APPLICATIONS_ID=your_applications_collection_id
APPWRITE_COLLECTION_MESSAGES_ID=your_messages_collection_id
APPWRITE_COLLECTION_TASKS_ID=your_tasks_collection_id
APPWRITE_COLLECTION_HACKATHONS_ID=your_hackathons_collection_id
APPWRITE_COLLECTION_CONTACTS_ID=your_contacts_collection_id

# Appwrite Storage Bucket IDs
APPWRITE_BUCKET_FILES_ID=your_files_bucket_id
APPWRITE_BUCKET_AVATARS_ID=your_avatars_bucket_id

# Server Configuration
PORT=5000
NODE_ENV=development


## Step 3: Create Database and Collections

1. In Appwrite Console, go to **Databases**
2. Create a new database (e.g., "squad-net")
3. Copy the Database ID and add it to your .env file as APPWRITE_DATABASE_ID

### Create Collections

For each collection below, create it in your database and copy the Collection ID:

#### Users Collection
- **Collection ID**: users
- **Attributes**:
  - name (String, required)
  - email (String, required, unique)
  - skills (String[], optional)
  - bio (String, optional)
  - avatar (String, optional)
  - createdAt (String, required)
  - updatedAt (String, required)
- **Indexes**: Create index on email for faster lookups
- **Permissions**: 
  - Read: users (authenticated users can read)
  - Create: users (authenticated users can create)
  - Update: users (users can update their own documents)
  - Delete: users (users can delete their own documents)

#### Projects Collection
- **Collection ID**: projects
- **Attributes**:
  - title (String, required)
  - description (String, required)
  - vision (String, optional)
  - ownerId (String, required)
  - stage (String, required) - enum: planning, development, testing, completed
  - tags (String[], optional)
  - createdAt (String, required)
  - updatedAt (String, required)
- **Indexes**: Create index on ownerId for faster lookups
- **Permissions**: Similar to users collection

#### Teams Collection
- **Collection ID**: teams
- **Attributes**:
  - projectId (String, required)
  - userId (String, required)
  - role (String, required) - enum: owner, admin, member, contributor
  - joinedAt (String, required)
- **Indexes**: Create indexes on projectId and userId

#### Applications Collection
- **Collection ID**: applications
- **Attributes**:
  - projectId (String, required)
  - userId (String, required)
  - status (String, required) - enum: pending, approved, rejected
  - message (String, optional)
  - appliedAt (String, required)
- **Indexes**: Create indexes on projectId, userId, and status

#### Messages Collection
- **Collection ID**: messages
- **Attributes**:
  - projectId (String, required)
  - userId (String, required)
  - content (String, required)
  - createdAt (String, required)
- **Indexes**: Create index on projectId for faster lookups

#### Tasks Collection
- **Collection ID**: tasks
- **Attributes**:
  - projectId (String, required)
  - title (String, required)
  - description (String, optional)
  - assignedTo (String, optional)
  - status (String, required) - enum: todo, in-progress, completed
  - createdAt (String, required)
  - updatedAt (String, required)
- **Indexes**: Create indexes on projectId and assignedTo

#### Hackathons Collection
- **Collection ID**: hackathons
- **Attributes**:
  - title (String, required)
  - description (String, required)
  - startDate (String, required)
  - endDate (String, required)
  - prize (Integer, optional) - in INR
  - status (String, required) - enum: upcoming, active, completed
  - createdAt (String, required)
- **Indexes**: Create index on status

#### Contacts Collection
- **Collection ID**: contacts
- **Attributes**:
  - name (String, required)
  - email (String, required)
  - message (String, required)
  - createdAt (String, required)
- **Permissions**: Allow public create, admin read/update/delete

## Step 4: Create Storage Buckets

1. In Appwrite Console, go to **Storage**
2. Create the following buckets:

### Files Bucket
- **Bucket ID**: files
- **Permissions**: 
  - Read: users
  - Create: users
  - Update: users
  - Delete: users

### Avatars Bucket
- **Bucket ID**: avatars
- **Permissions**: 
  - Read: any (public read for avatars)
  - Create: users
  - Update: users
  - Delete: users

Copy the Bucket IDs and add them to your .env file.

## Step 5: Test the Connection

1. Make sure your .env file is properly configured
2. Start your server:
   bash
   npm run server
   
3. You should see: ✅ Appwrite is configured and ready in the console

## Step 6: Update Your Controllers

You can now use the Appwrite services in your controllers. Example:

javascript
import { userService } from '../services/appwriteService.js';

// In your controller
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


## Available Services

The appwriteService.js file provides the following services:

- **userService**: Create, read, update, delete users
- **projectService**: Manage projects
- **storageService**: Handle file uploads/downloads
- **authService**: Authentication helpers

## Frontend Integration

For frontend authentication, you'll need to install the Appwrite client SDK:

bash
npm install appwrite


Then create an Appwrite client in your frontend:

javascript
import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('your_project_id');

const account = new Account(client);


## Need Help?

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Server SDK](https://appwrite.io/docs/references/console/server-sdk)
- [Appwrite Client SDK](https://appwrite.io/docs/references/console/client-sdk)


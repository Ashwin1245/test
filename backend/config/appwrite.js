import { Client, Databases, Account, Storage, Teams, Functions } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || '')
  .setKey(process.env.APPWRITE_API_KEY || '');

// Initialize Appwrite Services
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const functions = new Functions(client);

// Export client for custom operations
export const appwriteClient = client;

// Database and Collection IDs (you'll need to create these in Appwrite console)
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
  USERS: process.env.APPWRITE_COLLECTION_USERS_ID || '',
  PROJECTS: process.env.APPWRITE_COLLECTION_PROJECTS_ID || '',
  TEAMS: process.env.APPWRITE_COLLECTION_TEAMS_ID || '',
  APPLICATIONS: process.env.APPWRITE_COLLECTION_APPLICATIONS_ID || '',
  MESSAGES: process.env.APPWRITE_COLLECTION_MESSAGES_ID || '',
  TASKS: process.env.APPWRITE_COLLECTION_TASKS_ID || '',
  HACKATHONS: process.env.APPWRITE_COLLECTION_HACKATHONS_ID || '',
  CONTACTS: process.env.APPWRITE_COLLECTION_CONTACTS_ID || ''
};

// Storage Bucket IDs
export const BUCKETS = {
  FILES: process.env.APPWRITE_BUCKET_FILES_ID || '',
  AVATARS: process.env.APPWRITE_BUCKET_AVATARS_ID || ''
};

// Helper function to check if Appwrite is configured
export const isAppwriteConfigured = () => {
  return !!(
    process.env.APPWRITE_ENDPOINT &&
    process.env.APPWRITE_PROJECT_ID &&
    process.env.APPWRITE_API_KEY
  );
};

// Export default client
export default client;


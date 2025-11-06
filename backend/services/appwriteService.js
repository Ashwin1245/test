import {
  databases,
  account,
  storage,
  teams,
  DATABASE_ID,
  COLLECTIONS,
  BUCKETS
} from '../config/appwrite.js';
import { ID, Query } from 'node-appwrite';

/**
 * Appwrite Service - Helper functions for common database operations
 */

// ==================== USER OPERATIONS ====================

export const userService = {
  // Create a user document
  createUser: async (userData) => {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        ID.unique(),
        {
          name: userData.name,
          email: userData.email,
          skills: userData.skills || [],
          bio: userData.bio || '',
          avatar: userData.avatar || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      );
      return document;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const document = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );
      return document;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Get user by email
  getUserByEmail: async (email) => {
    try {
      const documents = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.equal('email', email)]
      );
      return documents.documents[0] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        {
          ...userData,
          updatedAt: new Date().toISOString()
        }
      );
      return document;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // List all users
  listUsers: async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        queries
      );
      return response;
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  }
};

// ==================== PROJECT OPERATIONS ====================

export const projectService = {
  // Create a project
  createProject: async (projectData) => {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        ID.unique(),
        {
          title: projectData.title,
          description: projectData.description,
          vision: projectData.vision || '',
          ownerId: projectData.ownerId,
          stage: projectData.stage || 'planning',
          tags: projectData.tags || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      );
      return document;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (projectId) => {
    try {
      const document = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        projectId
      );
      return document;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  // List projects
  listProjects: async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        queries
      );
      return response;
    } catch (error) {
      console.error('Error listing projects:', error);
      throw error;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        projectId,
        {
          ...projectData,
          updatedAt: new Date().toISOString()
        }
      );
      return document;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.PROJECTS,
        projectId
      );
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
};

// ==================== STORAGE OPERATIONS ====================

export const storageService = {
  // Upload file
  uploadFile: async (bucketId, file, fileId = null) => {
    try {
      const fileIdToUse = fileId || ID.unique();
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      
      const uploadedFile = await storage.createFile(
        bucketId,
        fileIdToUse,
        fileBuffer
      );
      return uploadedFile;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Get file
  getFile: async (bucketId, fileId) => {
    try {
      const file = await storage.getFile(bucketId, fileId);
      return file;
    } catch (error) {
      console.error('Error getting file:', error);
      throw error;
    }
  },

  // Get file preview URL
  getFilePreview: (bucketId, fileId) => {
    return storage.getFilePreview(bucketId, fileId);
  },

  // Delete file
  deleteFile: async (bucketId, fileId) => {
    try {
      await storage.deleteFile(bucketId, fileId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

// ==================== AUTHENTICATION HELPERS ====================

export const authService = {
  // Create session (for server-side auth)
  createSession: async (userId, secret) => {
    try {
      // Note: This requires Appwrite Server SDK with proper permissions
      // For client-side auth, use the Appwrite client SDK in frontend
      return { userId, sessionId: 'session_' + ID.unique() };
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  // Verify JWT token (if using custom JWT)
  verifyToken: async (token) => {
    // This would integrate with your JWT verification logic
    // Appwrite handles its own session management
    return null;
  }
};

export default {
  userService,
  projectService,
  storageService,
  authService
};


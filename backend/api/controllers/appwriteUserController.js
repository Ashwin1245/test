import { userService } from '../../services/appwriteService.js';
import { Query } from 'node-appwrite';
import { successResponse, errorResponse, asyncHandler } from '../../utils/helpers.js';

/**
 * Example User Controller using Appwrite
 * This demonstrates how to use Appwrite services in your controllers
 */
const appwriteUserController = {
  // Get all users
  getAllUsers: asyncHandler(async (req, res) => {
    const { limit = 25, offset = 0, search } = req.query;
    const queries = [];
    
    if (search) {
      queries.push(Query.search('name', search));
      queries.push(Query.search('email', search));
    }
    
    queries.push(Query.limit(parseInt(limit)));
    queries.push(Query.offset(parseInt(offset)));
    
    const response = await userService.listUsers(queries);
    res.json(successResponse(response, 'Users retrieved successfully'));
  }),

  // Get user by ID
  getUserById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await userService.getUserById(id);
      res.json(successResponse(user, 'User retrieved successfully'));
    } catch (error) {
      if (error.code === 404) {
        return res.status(404).json(
          errorResponse('User not found', 'USER_NOT_FOUND')
        );
      }
      throw error;
    }
  }),

  // Get user by email
  getUserByEmail: asyncHandler(async (req, res) => {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json(
        errorResponse('Email parameter is required', 'VALIDATION_ERROR')
      );
    }
    
    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json(
          errorResponse('User not found', 'USER_NOT_FOUND')
        );
      }
      res.json(successResponse(user, 'User retrieved successfully'));
    } catch (error) {
      throw error;
    }
  }),

  // Create new user
  createUser: asyncHandler(async (req, res) => {
    const { name, email, skills, bio, avatar } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json(
        errorResponse('Name and email are required', 'VALIDATION_ERROR')
      );
    }
    
    // Check if email already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json(
        errorResponse('Email already exists', 'EMAIL_EXISTS')
      );
    }
    
    // Create user
    const newUser = await userService.createUser({
      name,
      email,
      skills: skills || [],
      bio: bio || '',
      avatar: avatar || ''
    });
    
    res.status(201).json(successResponse(newUser, 'User created successfully'));
  }),

  // Update user
  updateUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.$id;
    delete updateData.createdAt;
    
    try {
      const updatedUser = await userService.updateUser(id, updateData);
      res.json(successResponse(updatedUser, 'User updated successfully'));
    } catch (error) {
      if (error.code === 404) {
        return res.status(404).json(
          errorResponse('User not found', 'USER_NOT_FOUND')
        );
      }
      throw error;
    }
  }),

  // Delete user
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
      await userService.deleteUser(id);
      res.json(successResponse(null, 'User deleted successfully'));
    } catch (error) {
      if (error.code === 404) {
        return res.status(404).json(
          errorResponse('User not found', 'USER_NOT_FOUND')
        );
      }
      throw error;
    }
  })
};

export default appwriteUserController;


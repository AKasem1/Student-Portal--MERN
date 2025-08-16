import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from './user.model';

export class UserController {
  
  // Generate JWT token
  private static generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || 'mysecretkey';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    
    return jwt.sign({ userId }, secret, { expiresIn } as jwt.SignOptions);
  }

  // Sign up new user
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({
          status: 'error',
          message: 'Email and password are required'
        });
        return;
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          status: 'error',
          message: 'User with this email already exists'
        });
        return;
      }

      // Create new user
      const user = new User({
        email,
        password
      });

      await user.save();

      // Generate token
      const token = UserController.generateToken((user as any)._id.toString());

      // Remove password from response
      const userResponse = {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      console.error('Error during signup:', error);
      
      // Handle duplicate email error
      if ((error as any).code === 11000) {
        res.status(409).json({
          status: 'error',
          message: 'User with this email already exists'
        });
        return;
      }

      // Handle validation errors
      if ((error as any).name === 'ValidationError') {
        const errors = Object.values((error as any).errors).map((err: any) => err.message);
        res.status(400).json({
          status: 'error',
          message: 'Validation error',
          details: errors
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create user'
      });
    }
  }

  // Login user
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({
          status: 'error',
          message: 'Email and password are required'
        });
        return;
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
        return;
      }

      const token = UserController.generateToken((user as any)._id.toString());

      // Remove password from response
      const userResponse = {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to login'
      });
    }
  }
}

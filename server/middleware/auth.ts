import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../modules/users/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

interface UserPayload {
    id: string;
    email: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'Access denied. Invalid token format. Use Bearer <token>'
      });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is not set');
      res.status(500).json({
        status: 'error',
        message: 'Server configuration error'
      });
      return;
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          status: 'error',
          message: 'Token expired. Please login again.'
        });
        return;
      }
      
      if (jwtError instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid token. Please login again.'
        });
        return;
      }

      res.status(401).json({
        status: 'error',
        message: 'Token verification failed.'
      });
      return;
    }

    const user = await User.findById(decoded.userId).select('-password') as IUser;
    
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Token is valid but user not found. Please login again.'
      });
      return;
    }


    req.user = {
      id: (user._id as string).toString(),
      email: user.email,
    } as UserPayload;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during authentication'
    });
  }
};

export const requireAuth = auth;
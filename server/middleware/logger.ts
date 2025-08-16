import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    
    console.log(
      `${new Date().toISOString()} - ${method} ${url} - ${status}\x1b[0m - ${duration}ms`
    );
  });
  
  next();
};

export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const id = Math.random().toString(36).substr(2, 9);
  req.headers['x-request-id'] = id;
  res.setHeader('x-request-id', id);
  next();
};

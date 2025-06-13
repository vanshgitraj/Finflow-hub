import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// SQL Injection prevention middleware
export const preventSQLInjection = (req: Request, res: Response, next: NextFunction) => {
  const sqlKeywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'CREATE', 'INSERT', 'UPDATE', 'UNION', 'SELECT', '--', ';'];
  
  const checkSQLInjection = (obj: any): boolean => {
    if (typeof obj === 'string') {
      const upperStr = obj.toUpperCase();
      return sqlKeywords.some(keyword => upperStr.includes(keyword));
    }
    
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => checkSQLInjection(value));
    }
    
    return false;
  };

  if (checkSQLInjection(req.body) || checkSQLInjection(req.query) || checkSQLInjection(req.params)) {
    return res.status(400).json({
      message: 'Invalid input detected',
      error: 'SECURITY_VIOLATION'
    });
  }

  next();
};

// XSS Prevention middleware
export const preventXSS = (req: Request, res: Response, next: NextFunction) => {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi
  ];

  const sanitizeXSS = (obj: any): any => {
    if (typeof obj === 'string') {
      let sanitized = obj;
      xssPatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
      });
      return sanitized;
    }
    
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        sanitized[key] = sanitizeXSS(obj[key]);
      }
      return sanitized;
    }
    
    return obj;
  };

  if (req.body) req.body = sanitizeXSS(req.body);
  if (req.query) req.query = sanitizeXSS(req.query);
  if (req.params) req.params = sanitizeXSS(req.params);

  next();
};

// Request size limitation
export const limitRequestSize = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > maxSize) {
    return res.status(413).json({
      message: 'Request too large',
      error: 'PAYLOAD_TOO_LARGE'
    });
  }

  next();
};

// IP whitelisting for admin endpoints
export const adminIPWhitelist = (req: Request, res: Response, next: NextFunction) => {
  const allowedIPs = [
    '127.0.0.1',
    '::1',
    'localhost'
  ];

  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  
  if (req.path.includes('/admin') && !allowedIPs.includes(clientIP || '')) {
    return res.status(403).json({
      message: 'Access denied from this IP',
      error: 'IP_NOT_ALLOWED'
    });
  }

  next();
};

// Enhanced rate limiting for sensitive operations
export const createStrictRateLimit = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// Security headers middleware
export const enhancedSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
  next();
};
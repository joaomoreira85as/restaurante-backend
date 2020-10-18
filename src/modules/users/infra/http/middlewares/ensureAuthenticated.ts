import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);
    const { sub } = decoded as ITokenPayload;

    request.company_id = sub;
    next();
  } catch (error) {
    throw new AppError('JWT token malformated', 401);
  }
}

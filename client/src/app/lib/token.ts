import jwt from 'jsonwebtoken';

interface DecodedToken {
  exp?: number;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const decoded = jwt.decode(token) as DecodedToken;
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000; // Convert current time to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

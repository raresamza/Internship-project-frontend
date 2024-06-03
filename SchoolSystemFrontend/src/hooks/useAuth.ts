import { useState, useEffect } from 'react';
import {JwtPayload, jwtDecode} from 'jwt-decode';
import { extractRelevantFields } from '../utils/utils';

export interface MyJwtPayload extends JwtPayload {
    FirstName?: string;
    LastName?: string;
    role?: string;
    email?: string;
  }

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<MyJwtPayload | null>();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);

      try {
        const decoded = extractRelevantFields(jwtDecode<MyJwtPayload>(parsedToken));
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  return decodedToken
};
export default useAuth;
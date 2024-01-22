import { generateJwt, validateJwt, validatePassword } from '../token';
import jwt from 'jsonwebtoken';

describe('TokenUtils', () => {
  describe('validatePassword', () => {
    const hashPassword = '$2b$08$4aHUkTak6StJFN5Dkr4ANuBocSLNZcTTrDBQqaFEy6dwka1peVoSm';

    it('should return true when a password match its hash', async () => {
      const matchingPassword = 'teste';

      const isValid = await validatePassword(hashPassword, matchingPassword);

      expect(isValid).toBeTruthy();
    });

    it('should return false when a password doesnt match its hash', async () => {
      const notMatchingPassword = 'teste2';

      const isValid = await validatePassword(hashPassword, notMatchingPassword);

      expect(isValid).toBeFalsy();
    });
  });

  describe('generateJwt', () => {
    it('should return a jwt', () => {
      const payload = { key: 'teste' };

      const token = generateJwt(payload);

      const decodedPayload = jwt.decode(token) as jwt.JwtPayload;
      expect(decodedPayload.key).toEqual('teste');
      expect(decodedPayload.iat).toBeDefined();
      expect(decodedPayload.exp).toBeDefined();
    });
  });

  describe('validateJwt', () => {
    it('should return true when a jwt is valid', () => {
      const validJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ0ZXN0ZSIsImlhdCI6MTcwNTY4ODgzNH0.i_1I_DIPIw3tXcovzoY7gZ1TkBB4I8luwSOTURYnwGw';

      const isValid = validateJwt(validJwt);

      expect(isValid).toBeTruthy();
    });

    it('should return false when a jwt is expired', () => {
      const expiredJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidGVzdCIsImlhdCI6MTcwNTY4ODY4MSwiZXhwIjoxNzA1Njg4NjgyfQ.WdY4a3XbauYsXLn3mZsGhR4ZnLHMRVZ_-BAhN5tqs60';

      const isValid = validateJwt(expiredJwt);

      expect(isValid).toBeFalsy();
    });

    it('should return false when a jwt is generated with a different secret', () => {
      const invalidJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoicGF5bG9hZCIsImlhdCI6MTcwNTY4ODU5MH0.zpYslzYDgUo2VaonCg6GoRLpwMal-SczLTiKuIKLwoU';

      const isValid = validateJwt(invalidJwt);

      expect(isValid).toBeFalsy();
    });
  });
});

export interface JwtDecoded {
  sub: string;
  iat: number;
  exp: number;
  roles: string[];
}
export enum UserRoles{
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

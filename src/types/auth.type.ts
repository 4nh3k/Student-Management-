import { SuccessResponse } from './utils.type';

type Roles = 'nv' | 'sv';
export interface AuthResponse extends SuccessResponse {
  refreshToken: string;
  accessToken: string;
  userId: number;
  role: Roles;
}

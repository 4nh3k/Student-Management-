import { AuthResponse } from 'src/types/auth.type';
import { getAccessTokenFromLS } from 'src/utils/auth';
import http from 'src/utils/http';

export const URL_LOGIN = 'auth/login';
export const URL_LOGOUT = 'auth/logout';
export const URL_REFRESH = 'auth/refresh';

const authApi = {
  login(username: string, password: string, role: string) {
    return http.post<AuthResponse>(
      `${URL_LOGIN}?username=${username}&password=${password}&role=${role}`
    );
  },
  logout() {
    const accessToken = getAccessTokenFromLS();
    return http.delete(`${URL_LOGOUT}?accessToken=${accessToken}`);
  },
  refreshToken(accessToken: string, refreshToken: string) {
    return http.post(URL_REFRESH, { accessToken, refreshToken });
  }
};

export default authApi;

import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { URL_LOGIN, URL_LOGOUT } from 'src/apis/auth.api';
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from './auth';

class Http {
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  public instance: AxiosInstance;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: 'https://student-management-server.up.railway.app',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.instance.interceptors.request.use(
      config => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          toast.error('Some things wrong!');
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config;
        if (url === URL_LOGIN) {
          const data = response.data;
          setAccessTokenToLS(data.accessToken);
          setRefreshTokenToLS(data.refreshToken);
        } else if (url === URL_LOGOUT) {
          this.accessToken = '';
          // this.refreshToken = '';
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;

export default http;

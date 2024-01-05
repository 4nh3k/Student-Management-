export interface ResponseAPI<Data> {
  message: string;
  data?: Data;
}

// export interface SuccessResponse {
//   message: string;
// }

export interface SuccessResponse<Data> {
  status: string;
  data: Data;
}

export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

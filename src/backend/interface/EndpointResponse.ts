export interface EndpointResponse {
  data?: any;
  token?: string;
  message?: string;
  statusCode?: number;
  error?: any;
  pagination?: {
    count: number;
    page: any;
    pageSize: any;
    totalPages: number;
  };
}

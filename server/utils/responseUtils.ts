export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: string[];
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T = any> {
  status: 'success';
  data: Record<string, any> & {
    pagination: PaginationInfo;
  };
}

export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    status: 'success',
    data
  };
  
  if (message) {
    response.message = message;
  }
  
  return response;
};

export const createErrorResponse = (message: string, errors?: string[]): ApiResponse => {
  const response: ApiResponse = {
    status: 'error',
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return response;
};

export const createPaginatedResponse = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
  key: string
): PaginatedResponse<T> => {
  const data: Record<string, any> & { pagination: PaginationInfo } = {
    [key]: items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
  
  return {
    status: 'success',
    data
  };
};

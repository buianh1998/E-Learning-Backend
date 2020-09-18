import { type } from "os";

export type SuccessResponse<T> = {
  success?: true;
  message?: string;
  metadate?: string;
  data?: T;
};
export type ErrorResponse = {
  code?: number;
  message?: string;
  error?: string;
  data?: any;
};

type Pagination<T> = {
  limit?: number;
  offset?: number;
  total?: number;
  data?: T[];
};

export type PaginationResponse<T> = {
  success?: true;
  message?: string;
  metadate?: string;
  data?: Pagination<T>;
};

export type ValidateErrors = {
  [field: string]: {
    [contraintName: string]: string;
  };
};

export const validateErrorsResponse = (
  errors: ValidateErrors
): ErrorResponse => ({
  code: 412,
  message: "VALIDATE_ERROR",
  error: "VALIDATE_ERROR",
  data: errors,
});

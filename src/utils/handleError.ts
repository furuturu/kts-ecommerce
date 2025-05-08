import { ApiError } from "types/error.ts";
import { isAxiosError } from "axios";
import { isApiErrorResponse } from "./isApiError.ts";

export function handleError(error: unknown): ApiError {
  if (isApiErrorResponse(error)) {
    const strapiError = error.response.data.error;
    return {
      code: String(strapiError.status || error.response.status),
      message:
        strapiError.message || "Произошла ошибка при обращении к серверу",
      field: strapiError.details?.target,
      originalError: error,
    };
  }

  if (isAxiosError(error)) {
    if (error.code) {
      return {
        code: error.code,
        message:
          error.message || "Ошибка сети. Проверьте подключение к интернету.",
        originalError: error,
      };
    }

    return {
      code: String(error.response?.status || "UNKNOWN"),
      message: error.message || "Произошла ошибка при обращении к серверу",
      originalError: error,
    };
  }

  if (error instanceof Error) {
    return {
      code: "JS_ERROR",
      message: error.message || "Произошла ошибка в приложении",
      originalError: error,
    };
  }

  return {
    code: "UNKNOWN",
    message: "Произошла неизвестная ошибка",
    originalError: error,
  };
}

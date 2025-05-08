export interface ApiError {
  code: string; // Код ошибки
  message: string; // Человекочитаемое сообщение
  field?: string; // Поле, к которому относится ошибка
  originalError?: unknown; // Исходная ошибка
}

export interface StrapiErrorResponse {
  response: {
    data: {
      error: {
        name: string;
        message: string;
        status: number;
        details?: Record<string, unknown>;
      };
    };
    status: number;
  };
}

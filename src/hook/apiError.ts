import { useCallback } from "react";

type ErrorHandler = () => void;

type HandleType = {
  [key: string]: ErrorHandler | { [key: string]: ErrorHandler };
};

export const apiError = () => {
  const handle400: ErrorHandler = () => {
    alert("400 잘못된 요청입니다");
  };

  const handle401: ErrorHandler = () => {
    alert("401 인증에 실패했습니다");
  };

  const handle403: ErrorHandler = () => {
    alert("403 권한이 없습니다");
  };

  const handle404: ErrorHandler = () => {
    alert("404 찾을 수 없습니다");
  };

  const handle503: ErrorHandler = () => {
    alert("503 : 관리자에게 문의하세요");
  };

  const handle500: ErrorHandler = () => {
    alert("500 : 관리자에게 문의주세요");
  };

  const handleDefault: ErrorHandler = () => {
    alert("알 수 없는 오류가 발생했습니다");
  };

  const defaultHandlers: HandleType = {
    "400": handle400,
    "401": handle401,
    "403": handle403,
    "404": handle404,
    "500": handle500,
    "503": handle503,
    default: handleDefault,
  };

  const handleError = useCallback((error: any) => {
    const httpStatus = error.response?.status;
    const errorMessage = error.data?.errorMessage;

    if (httpStatus) {
      const selectedHandler: ErrorHandler | { [key: string]: ErrorHandler } =
        defaultHandlers[httpStatus] || defaultHandlers.default;
      const specificErrorHandler = errorMessage
        ? (selectedHandler as { [key: string]: ErrorHandler })[errorMessage]
        : null;
      if (specificErrorHandler) {
        specificErrorHandler();
      } else {
        (selectedHandler as ErrorHandler)();
      }
    } else {
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  }, []);

  return { handleError };
};

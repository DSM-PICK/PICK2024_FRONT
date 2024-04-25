// import { useCallback } from "react";

// type HandleType = {
//   [error: string | number]: any;
// };

// export const apiError = () => {
//   const handle400 = () => {
//     alert("잘못된 요청입니다");
//   };

//   const handle401 = () => {
//     alert("인증에 실패했습니다");
//   };

//   const handle403 = () => {
//     alert("권한이 없습니다");
//   };

//   const handle404 = () => {
//     alert("찾을 수 없습니다");
//   };

//   const handle503 = () => {
//     alert("이건 뭐야");
//   };

//   const handle500 = () => {
//     alert("관리자에게 문의주세요");
//   };

//   const handleDefault = () => {};

//   const defaultHandlers: HandleType = {
//     400: { default: handle400 },
//     401: { default: handle401 },
//     403: { default: handle403 },
//     404: { default: handle404 },
//     500: { default: handle500 },
//     503: { default: handle503 },
//     default: handleDefault,
//   };

//   const handleError = useCallback((error: any) => {
//     const httpStatus = error.response?.status;
//     const errorMessage = error.data?.errorMessage;

//     const selectedHandlers = defaultHandlers;

//     if (
//       httpStatus &&
//       selectedHandlers[httpStatus] &&
//       errorMessage &&
//       selectedHandlers[httpStatus][errorMessage]
//     ) {
//       selectedHandlers[httpStatus][errorMessage]();
//     } else if (httpStatus && selectedHandlers[httpStatus]) {
//       selectedHandlers[httpStatus](error);
//     } else {
//       selectedHandlers.default(error);
//     }
//   }, []);

//   return { handleError };
// };

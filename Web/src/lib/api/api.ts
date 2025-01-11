import api from "./index";
import {
  iAddress,
  iCartGood,
  iGood,
  iShippingApi,
  TUserInfo,
} from "../definitions";
import { Goods } from "../goods";

type TServerResponse<T> = {
  status: number;
  response?: T;
  error?: Error;
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  return res.json();
};

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit,
) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw res;
    }
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { status: number }).status === 401) {
      const refreshData = await refreshToken();

      if (options.headers && refreshData.response) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.response.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${api}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      RefreshToken: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (refreshData.error || !refreshData.response) {
        return Promise.reject(refreshData);
      }
      console.log(refreshData.response);
      localStorage.setItem("refreshToken", refreshData.response.refreshToken);
      localStorage.setItem(
        "accessToken",
        "Bearer " + refreshData.response.accessToken,
      );
      return refreshData;
    });

// Пользователь

export type TUserData = {
  email: string;
  password: string;
};

export const registerUser = (userData: TUserData) =>
  fetch(`${api}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(userData),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((userRes) => {
      if (userRes.response) {
        localStorage.setItem("refreshToken", userRes.response.refreshToken);
        localStorage.setItem(
          "accessToken",
          "Bearer " + userRes.response.accessToken,
        );
      }

      return userRes;
    });

export const loginUser = (userData: TUserData) =>
  fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(userData),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((userRes) => {
      if (userRes.response) {
        localStorage.setItem("refreshToken", userRes.response.refreshToken);
        localStorage.setItem(
          "accessToken",
          "Bearer " + userRes.response.accessToken,
        );
        return userRes;
      }
    });

// Данные пользователя

export type TGetUserData = {
  personalData: TUserInfo;
  addressData: iAddress;
};

export type TUpdateUserData = {
  personalData?: TUserInfo;
  addressData?: iAddress;
};

export type TUpdateUserDataResponse = TServerResponse<Partial<TGetUserData>>;
export type TGetUserDataResponse = TServerResponse<TGetUserData>;

export const getUserData = () =>
  fetch(`${api}/account`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
  })
    .then((res) => checkResponse<TGetUserDataResponse>(res))
    .then((res) => {
      console.log(res);
      if (res.error) return Promise.reject(res);
      return res;
    });

export const updateUserData = (newData: TUpdateUserData) =>
  fetchWithRefresh<TUpdateUserDataResponse>(`${api}/account`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify(newData),
  }).then((res) => res);

// // Получение товара по ссылке
// type TProductResponse = TServerResponse<iGood>;\

export const getRandArrElem = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getDewu = (url: string) => {
  const res = getRandArrElem<iGood>(Goods);
  return Promise.resolve({ response: res });
  // return fetchWithRefresh<TProductResponse>(`${api}/dewu?productUrl=${productUrl}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //     authorization: localStorage.getItem("accessToken"),
  //   } as HeadersInit,
  // });
};
// Создание заказа
export type TOrderResponse = TServerResponse<{
  orderNumber: string;
}>;

export type TOrderRequest = {
  goods: { goodId: string; count: number }[];
  userData: TUserInfo;
  addressData: Omit<iAddress, "id">;
};

export const postOrder = (data: TOrderRequest) => {
  fetchWithRefresh<TOrderResponse>(`${api}/idk`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data),
  }).then((res) => res);
};

// Получение заказов
export type TOrdersResponse = TServerResponse<iShippingApi>;

export type TOrdersRequest = { userId: string };

export const getOrders = (data: TOrdersRequest) => {
  fetchWithRefresh<TOrdersResponse>(`${api}/idk`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data),
  }).then((res) => res);
};

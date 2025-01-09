import api from "./index";
import { iAddress, iGood, iShippingApi, TUserInfo } from "../definitions";

type TServerResponse<T> = {
  status: number;
  response?: T;
  error?: Error;
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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
    console.log(err, 1);
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
    },
    body: JSON.stringify({
      RefreshToken: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (refreshData.error || !refreshData.response) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(
        "refreshToken",
        "Bearer " + refreshData.response.refreshToken,
      );
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
        console.log(userRes.response);
        localStorage.setItem(
          "refreshToken",
          "Bearer " + userRes.response.refreshToken,
        );
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
        console.log(userRes.response);
        localStorage.setItem(
          "refreshToken",
          "Bearer " + userRes.response.refreshToken,
        );
        localStorage.setItem(
          "accessToken",
          "Bearer " + userRes.response.accessToken,
        );
        return userRes;
      }
    });

// Обновление данных пользователя

export type TUpdateUserData = {
  userData: TUserInfo | Omit<iAddress, "id">;
};

export type TUpdateUserDataResponse = TServerResponse<TUpdateUserData>;

export const updateUserData = (newData: TUpdateUserData) =>
  fetchWithRefresh<TUpdateUserDataResponse>("/idk", {
    method: "PATCH",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(newData),
  }).then((res) => res);

// Получение товара по ссылке
type TProductResponse = TServerResponse<iGood>;

export const getDewu = (productUrl: string) =>
  fetchWithRefresh<TProductResponse>(`${api}/dewu?productUrl=${productUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
  });

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

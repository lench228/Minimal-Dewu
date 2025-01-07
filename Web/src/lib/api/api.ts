import api from "./index";

type TServerResponse<T> = {
  status: number;
  response: T;
  error: Error;
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

// const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse<T>(res);
//   } catch (err) {
//     if ((err as { message: string }).message === "jwt expired") {
//       const refreshData = await refreshToken();
//
//       if (options.headers) {
//         (options.headers as { [key: string]: string }).authorization =
//           refreshData.response.accessToken;
//       }
//       const res = await fetch(url, options);
//       return await checkResponse<T>(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (refreshData.error) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.response.refreshToken);
      localStorage.setItem("accessToken", refreshData.response.accessToken);
      return refreshData;
    });

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
      return userRes.error;
    })
    .catch((err) => Promise.reject(err));

export const loginUser = (userData: TUserData) =>
  fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(userData),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((userRes) => {
      return userRes.error;
    })
    .catch((err) => Promise.reject(err));

import axios, { type AxiosInstance } from "axios";

export async function request<T>(fetcher: (axios: AxiosInstance) => Promise<T>) {
  const token = await getTokenFromNativeApp();
  const axiosInstance = axios.create({
    baseURL: "https://swapi.dev/api",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });  
  const result = await fetcher(axiosInstance);
  return result;
}

async function getTokenFromNativeApp() {
  const eventName = `getToken_${Date.now()}`;

  return new Promise<string>((resolve) => {
    window.nativeAppCallbacks = {
      ...window.nativeAppCallbacks,
      [eventName]: (token: string) => {
        resolve(token);
      }
    }
  });
}

declare global {
  interface Window { nativeAppCallbacks: {[eventName: string]: (token: string) => void}; }
}

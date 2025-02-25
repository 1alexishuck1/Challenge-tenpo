import { AxiosResponse } from "axios";

const generateRandomToken = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const fakeLogin = async (
  email: string,
  password: string
): Promise<AxiosResponse<{ token: string }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: { token: generateRandomToken(16) },
        statusText: "OK",
        headers: {},
        config: {} as any
      });
    }, 1500);
  });
};

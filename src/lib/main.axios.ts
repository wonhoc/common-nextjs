// src/lib/axios.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const mainApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_MAIN}/api/main`,
    withCredentials: true, // 쿠키 인증 필요시 true
});

mainApi.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
});

mainApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const { signOut } = await import("next-auth/react");
            await signOut();
        }
        return Promise.reject(error);
    }
);

export default mainApi;

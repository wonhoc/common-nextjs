import mainApi from "@/lib/main.axios";
import { LoginRequest } from "@/types/user.type";

// /api/main
export const authApi = {
    login: async (loginRequest: LoginRequest) => {
        const response = await mainApi.post("/auth/login", loginRequest);
        return response.data;
    },

    logout: async (): Promise<void> => {
        const response = await mainApi.post("/auth/loginout");
        return response.data;
    },
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function errorMessage(error: unknown): string {
    let rtnMessage: string = "";

    if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            rtnMessage = message;
        } else {
            rtnMessage = error.message;
        }
    } else {
        rtnMessage = "알 수 없는 에러 발생";
    }

    return rtnMessage;
}

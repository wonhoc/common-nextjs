import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "@/types/user.type";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (loginRequest: LoginRequest) => {
      const result = await signIn("credentials", {
        email: loginRequest.email,
        password: loginRequest.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.push("/board"); // 로그인 성공 시 이동
    },
    onError: () => {
      console.log("error");
    },
  });
};

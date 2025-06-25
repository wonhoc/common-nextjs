import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mainApi from "@/lib/main.axios";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData = {
            email: credentials.email,
            password: credentials.password,
          };
          const response = await mainApi.post("/auth/login", loginData);

          const data = await response.data;

          if (data.access_token) {
            return {
              id: data.id || data.id,
              email: loginData.email,
              name: loginData.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        const accessTokenExpires = extractTokenExpires(
          user.accessToken as string
        );

        if (Date.now() >= accessTokenExpires) {
          return await refreshAccessToken(token);
        }
      } else {
        if (!token.accessToken) {
          return {
            ...token,
            error: "NoAccessToken",
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};

// 토큰 갱신 함수
async function refreshAccessToken(token: any) {
  try {
    const response = await mainApi.post("/auth/refresh", {
      refresh_token: token.refreshToken,
    });

    const refreshedTokens = response.data;

    if (refreshedTokens.access_token) {
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: extractTokenExpires(refreshedTokens.access_token),
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      };
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
  }

  return {
    ...token,
    error: "RefreshAccessTokenError",
  };
}

function extractTokenExpires(accessToken: string) {
  const decoded = jwt.decode(accessToken) as any;

  return decoded?.exp ? decoded.exp * 1000 : Date.now() + 15 * 60 * 1000;
}

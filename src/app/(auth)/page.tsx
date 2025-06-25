"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { LoginRequest } from "@/types/user.type";
import { useLoginMutation } from "@/hooks/user.mutation";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  // FormData 생성
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const { mutate } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(form);
  };

  const handleNavigateToSshRegister = () => {
    router.push("/ssh/register"); // 다른 페이지로 이동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">Login</CardTitle>
          <CardDescription
            className={`${errorMsg ? "text-red-500" : "text-gray-500"}`}
          >
            {errorMsg || "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                E-MAIL
              </Label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                id="email"
                type="text"
                placeholder="Email"
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                PASSWORD
              </Label>
              <div className="relative">
                <Input
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  className="border-gray-300 focus:border-black focus:ring-black pr-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have a server?{" "}
            <a
              onClick={handleNavigateToSshRegister}
              className="font-medium text-black hover:underline"
            >
              Register New Server
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

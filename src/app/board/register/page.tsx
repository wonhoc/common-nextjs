"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateBoard } from "@/hooks/board.mutation";

export default function PostPage() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const { mutate } = useCreateBoard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(form);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>새 게시글 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(content) => setForm({ ...form, content: content })}
                  placeholder="게시글 내용을 입력하세요"
                  rows={10}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">작성하기</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  취소
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoards } from "@/hooks/board.mutation";
import { GetBoardResponse, SearchBoardRequest } from "@/types/board.type";
import { PlusCircle, Calendar, User } from "lucide-react";
import { Pagination } from "@/components/pagination";

export default function LoginForm() {
  const router = useRouter();

  // 페이지 이동 함수
  const handleNavigate = (path: string) => {
    router.push("/board" + path); // 다른 페이지로 이동
  };

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState<SearchBoardRequest>({
    keyword: "",
    limit: 3,
    page: 1,
  });

  const handlePageChange = (page: number) => {
    // form 업데이트
    setForm({ ...form, page });
    // 데이터 다시 가져오기
    refetch();
  };

  const { data, isLoading, refetch } = useBoards(form);

  useEffect(() => {}, [data]);

  // 서버 선택 처리
  const handleSelectServer = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board</h1>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/register")}
        >
          <PlusCircle className="w-4 h-4" />
          Create Board
        </Button>
      </div>

      {!data?.data.items || data.data.items.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg mb-4">There is no data.</p>
            <Button onClick={() => handleNavigate("/register")}>
              첫 번째 글 작성하기
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {data?.data.items.map((board: GetBoardResponse, index: number) => (
            <Card key={board.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle
                      onClick={() => handleNavigate("/" + board.id)}
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {board.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {board.content}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {board.createDtm
                          ? new Date(board.createDtm).toLocaleDateString(
                              "ko-KR"
                            )
                          : "날짜 없음"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3">
                  {board.content.length > 150
                    ? `${board.content.substring(0, 150)}...`
                    : board.content}
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() => handleNavigate("/" + board.id)}
                    variant="outline"
                    size="sm"
                  >
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        currentPage={data?.data.pagination.currentPage}
        totalPages={data?.data.pagination.totalPages}
        hasNextPage={data?.data.pagination.hasNext}
        hasPrevPage={data?.data.pagination.hasPrevious}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

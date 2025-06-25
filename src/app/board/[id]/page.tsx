"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Edit } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useBoard } from "@/hooks/board.mutation";

export default function PostPage() {
  const params = useParams();
  const boardId = params?.id as string; // URL 파라미터에서 id 가져오기

  const { data, isLoading, error } = useBoard(Number(boardId));
  const router = useRouter();

  // 페이지 이동 함수
  const handleNavigate = (path = "") => {
    router.push("/board" + path);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-4">
        <div>로딩 중...</div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            게시글을 불러오는데 실패했습니다.
          </div>
          <Button onClick={() => handleNavigate()}>목록으로 돌아가기</Button>
        </div>
      </main>
    );
  }

  const board = data?.data;

  // 데이터가 없는 경우
  if (!board) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="text-center">
          <div className="mb-4">게시글을 찾을 수 없습니다.</div>
          <Button onClick={() => handleNavigate()}>목록으로 돌아가기</Button>
        </div>
      </main>
    );
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  return (
    <main className=" flex-1 min-h-screen items-center justify-center bg-white p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={() => handleNavigate()}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-4">{board.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {board.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      작성일: {formatDate(board.createDtm)}
                    </div>
                    {board.createDtm !== board.updatedDtm && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        수정일: {formatDate(board.updatedDtm)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {board.content}
                </div>
              </div>

              <div className="flex gap-2 mt-8 pt-6 border-t">
                <Button
                  onClick={() => handleNavigate(`/edit/${boardId}`)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  수정
                </Button>
                <Button
                  onClick={() => handleNavigate(`/delete/${boardId}`)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

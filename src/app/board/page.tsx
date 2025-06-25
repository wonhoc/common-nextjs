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
import {
  FormBasedFilters,
  type FilterConfig,
} from "@/components/form-based-filters";

export default function BoardList() {
  const router = useRouter();

  // 페이지 이동 함수
  const handleNavigate = (path: string) => {
    router.push("/board" + path);
  };

  const [form, setForm] = useState<SearchBoardRequest>({
    title: "",
    content: "",
    dateFrom: "",
    dateTo: "",
    limit: 3,
    page: 1,
    sort: "",
    order: "DESC",
  });

  // 실제 검색에 사용될 폼 상태 (검색 버튼을 눌렀을 때만 업데이트)
  const [searchForm, setSearchForm] = useState<SearchBoardRequest>(form);

  const filters: FilterConfig[] = [
    {
      field: "title",
      label: "제목",
      type: "text",
      placeholder: "제목을 입력하세요...",
    },
    {
      field: "content",
      label: "내용",
      type: "text",
      placeholder: "내용을 입력하세요...",
    },
    {
      field: "dateFrom",
      label: "검색 시작일",
      type: "date",
    },
    {
      field: "dateTo",
      label: "검색 종료일",
      type: "date",
    },
  ];

  const handlePageChange = (page: number) => {
    const newSearchForm = { ...searchForm, page };
    setSearchForm(newSearchForm);
  };

  // searchForm을 사용하여 API 호출
  const { data, isLoading, refetch } = useBoards(searchForm);

  const handleSearch = () => {
    // 검색 시 첫 페이지로 리셋하고 searchForm 업데이트
    const newSearchForm = { ...form, page: 1 };
    setSearchForm(newSearchForm);
  };

  // 페이지 변경 시에만 자동 실행 (검색은 수동으로만)
  useEffect(() => {
    // searchForm이 변경될 때만 refetch (검색 버튼 또는 페이지 변경)
    refetch();
  }, [searchForm, refetch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Board</h1>
        </div>
      </div>

      {/* 동적 필터 */}
      <FormBasedFilters
        form={form}
        onFormChange={setForm}
        onSearch={handleSearch}
        filterConfigs={filters}
      />

      <div className="flex justify-end mb-6">
        <Button
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/register")}
        >
          <PlusCircle className="w-4 h-4" />
          Create Board
        </Button>
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg">Loading...</p>
          </CardContent>
        </Card>
      ) : !data?.data.items || data.data.items.length === 0 ? (
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
          {data.data.items.map((board: GetBoardResponse) => (
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
                        작성자 정보
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

      {/* 페이지네이션 - 데이터가 있을 때만 표시 */}
      {data?.data.items && data.data.items.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={data.data.pagination.currentPage}
            totalPages={data.data.pagination.totalPages}
            hasNextPage={data.data.pagination.hasNext}
            hasPrevPage={data.data.pagination.hasPrevious}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

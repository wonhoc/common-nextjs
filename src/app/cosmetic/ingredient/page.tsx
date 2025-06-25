"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetIngredientResponseDto,
  SearchIngredientRequest,
} from "@/types/ingredient.type";
import { PlusCircle, Calendar, User } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { useIngredients } from "@/hooks/ingredient.mutation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

export default function ingredientForm() {
  const router = useRouter();

  // 페이지 이동 함수
  const handleNavigate = (path: string) => {
    router.push("/board" + path); // 다른 페이지로 이동
  };

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState<SearchIngredientRequest>({
    keyword: "",
    limit: 10,
    page: 1,
  });

  const handlePageChange = (page: number) => {
    // form 업데이트
    setForm({ ...form, page });
    // 데이터 다시 가져오기
    refetch();
  };

  const { data, isLoading, refetch } = useIngredients(form);

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
          <h1 className="text-3xl font-bold text-gray-900">Ingredient</h1>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => handleNavigate("/register")}
        >
          <PlusCircle className="w-4 h-4" />
          Create Ingredient
        </Button>
      </div>

      {!data?.data.items || data.data.items.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500 text-lg mb-4">There is no data.</p>
            <Button onClick={() => handleNavigate("/register")}>
              Create The First Ingredient
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>영어 원료명</TableHead>
                <TableHead className="hidden md:table-cell">
                  한글 원료명
                </TableHead>
                <TableHead>Cas No</TableHead>
                <TableHead className="hidden sm:table-cell">function</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.items.map((ingredient: GetIngredientResponseDto) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">
                    #{ingredient.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {ingredient.nameEnglish}
                  </TableCell>
                  <TableCell className="font-medium">
                    {ingredient.nameKorean}
                  </TableCell>
                  <TableCell className="font-medium">
                    {ingredient.casNo}
                  </TableCell>
                  <TableCell className="font-medium">
                    {ingredient.func}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">액션 메뉴</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

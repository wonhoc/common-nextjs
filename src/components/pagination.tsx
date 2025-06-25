"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const handlePageClick = (pageNumber: number) => {
    onPageChange?.(pageNumber);
  };

  // 페이지 번호 배열 생성 (현재 페이지 주변 5개 페이지만 표시)
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* 이전 페이지 버튼 */}

      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        variant="outline"
        size="sm"
        disabled={!hasPrevPage}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        이전
      </Button>

      {/* 페이지 번호들 */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button
                onClick={() => handlePageClick(page as number)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}

      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        className="flex items-center gap-1"
      >
        다음
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Filter } from "lucide-react";

export interface FilterItem {
  id: string;
  field: string;
  value: string;
  label: string;
}

interface DynamicFiltersProps {
  filters: FilterItem[];
  onFiltersChange: (filters: FilterItem[]) => void;
  onSearch: (filters: FilterItem[]) => void; // 새로 추가
  resultCount: number;
  totalCount: number;
}

const FILTER_OPTIONS = [
  { value: "name", label: "이름" },
  { value: "email", label: "이메일" },
  { value: "role", label: "역할" },
  { value: "status", label: "상태" },
  { value: "joinDate", label: "가입일" },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "관리자" },
  { value: "user", label: "사용자" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "활성" },
  { value: "inactive", label: "비활성" },
];

export function DynamicFilters({
  filters,
  onFiltersChange,
  onSearch,
  resultCount,
  totalCount,
}: DynamicFiltersProps) {
  const [selectedField, setSelectedField] = useState("");
  const [hasChanges, setHasChanges] = useState(false); // 새로 추가

  const addFilter = () => {
    if (!selectedField) return;

    const fieldOption = FILTER_OPTIONS.find(
      (option) => option.value === selectedField
    );
    if (!fieldOption) return;

    const newFilter: FilterItem = {
      id: `${selectedField}-${Date.now()}`,
      field: selectedField,
      value: "",
      label: fieldOption.label,
    };

    onFiltersChange([...filters, newFilter]);
    setSelectedField("");
    setHasChanges(true); // 변경사항 표시
  };

  const updateFilter = (id: string, value: string) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id ? { ...filter, value } : filter
    );
    onFiltersChange(updatedFilters);
    setHasChanges(true); // 변경사항 표시
  };

  const removeFilter = (id: string) => {
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    onFiltersChange(updatedFilters);
    setHasChanges(true); // 변경사항 표시
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  const renderFilterInput = (filter: FilterItem) => {
    switch (filter.field) {
      case "role":
        return (
          <Select
            value={filter.value}
            onValueChange={(value) => updateFilter(filter.id, value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="역할 선택..." />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "status":
        return (
          <Select
            value={filter.value}
            onValueChange={(value) => updateFilter(filter.id, value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="상태 선택..." />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "joinDate":
        return (
          <Input
            type="date"
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            className="h-9"
          />
        );

      default:
        return (
          <Input
            placeholder={`${filter.label}으로 검색...`}
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            className="h-9"
          />
        );
    }
  };

  const availableFields = FILTER_OPTIONS.filter(
    (option) => !filters.some((filter) => filter.field === option.value)
  );

  const handleSearch = () => {
    onSearch(filters);
    setHasChanges(false);
  };

  const handleReset = () => {
    onFiltersChange([]);
    onSearch([]);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="font-medium">검색 필터</span>
          {filters.length > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filters.length}개 적용 중
            </Badge>
          )}
        </div>
        {filters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            모든 필터 지우기
          </Button>
        )}
      </div>

      {/* 필터 추가 버튼 */}
      <div className="flex items-center gap-2">
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="검색 조건 선택..." />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={addFilter}
          disabled={!selectedField}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          필터 추가
        </Button>
      </div>

      {/* 활성 필터들 */}
      {filters.length > 0 && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-3">
              <Badge variant="outline" className="min-w-16 justify-center">
                {filter.label}
              </Badge>
              <div className="flex-1">{renderFilterInput(filter)}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter(filter.id)}
                className="h-9 w-9 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 검색 버튼 영역 */}
      {filters.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-200 bg-orange-50"
              >
                조건이 변경됨
              </Badge>
            )}
            <span className="text-sm text-gray-600">
              {filters.filter((f) => f.value).length}개의 검색 조건이
              설정되었습니다
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              초기화
            </Button>
            <Button
              size="sm"
              onClick={handleSearch}
              className={hasChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {hasChanges ? "검색 실행" : "검색됨"}
            </Button>
          </div>
        </div>
      )}

      {/* 결과 요약 */}
      {filters.length > 0 && (
        <div className="flex items-center justify-between text-sm bg-blue-50 border border-blue-200 rounded p-3">
          <span className="text-blue-900">
            <strong>{resultCount}명</strong>이 검색 조건과 일치합니다 (전체{" "}
            {totalCount}명 중)
          </span>
          <span className="text-blue-600">
            {resultCount === 0
              ? "조건을 변경해보세요"
              : `${((resultCount / totalCount) * 100).toFixed(1)}% 일치`}
          </span>
        </div>
      )}
    </div>
  );
}

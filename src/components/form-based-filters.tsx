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

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  field: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  options?: FilterOption[];
  placeholder?: string;
}

interface ActiveFilter {
  field: string;
  label: string;
  type: string;
}

interface FormBasedFiltersProps<T> {
  form: T;
  onFormChange: (form: T) => void;
  onSearch: () => void;
  filterConfigs: FilterConfig[];
}

export function FormBasedFilters<T extends Record<string, any>>({
  form,
  onFormChange,
  onSearch,
  filterConfigs,
}: FormBasedFiltersProps<T>) {
  const [selectedField, setSelectedField] = useState("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const addFilter = () => {
    if (!selectedField) return;

    const config = filterConfigs.find((c) => c.field === selectedField);
    if (!config) return;

    const newFilter: ActiveFilter = {
      field: selectedField,
      label: config.label,
      type: config.type,
    };

    setActiveFilters((prev) => [...prev, newFilter]);
    setSelectedField("");
  };

  const removeFilter = (fieldToRemove: string) => {
    setActiveFilters((prev) =>
      prev.filter((filter) => filter.field !== fieldToRemove)
    );

    const updatedForm = { ...form } as any;
    if (fieldToRemove in updatedForm) {
      const config = filterConfigs.find((c) => c.field === fieldToRemove);
      if (config?.type === "number") {
        updatedForm[fieldToRemove] = 0;
      } else {
        updatedForm[fieldToRemove] = "";
      }
    }
    onFormChange(updatedForm);
  };

  const updateFormField = (field: string, value: any) => {
    const updatedForm = { ...form, [field]: value } as T;
    onFormChange(updatedForm);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    const clearedForm = { ...form } as any;
    filterConfigs.forEach((config) => {
      if (config.field in clearedForm) {
        if (config.type === "number") {
          clearedForm[config.field] = 0;
        } else {
          clearedForm[config.field] = "";
        }
      }
    });
    onFormChange(clearedForm);
  };

  const renderFilterInput = (filter: ActiveFilter) => {
    const config = filterConfigs.find((c) => c.field === filter.field);
    if (!config) return null;

    const currentValue = form[filter.field] || "";

    switch (config.type) {
      case "select":
        return (
          <Select
            value={currentValue}
            onValueChange={(value) => updateFormField(filter.field, value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue
                placeholder={config.placeholder || `${config.label} 선택...`}
              />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Input
            type="date"
            value={currentValue}
            onChange={(e) => updateFormField(filter.field, e.target.value)}
            className="h-9"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={currentValue || ""}
            onChange={(e) =>
              updateFormField(
                filter.field,
                e.target.value === "" ? 0 : Number.parseInt(e.target.value) || 0
              )
            }
            placeholder={config.placeholder}
            className="h-9"
          />
        );

      case "text":
      default:
        return (
          <Input
            placeholder={config.placeholder || `${config.label}으로 검색...`}
            value={currentValue}
            onChange={(e) => updateFormField(filter.field, e.target.value)}
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearch();
              }
            }}
          />
        );
    }
  };

  const availableFields = filterConfigs.filter(
    (config) => !activeFilters.some((filter) => filter.field === config.field)
  );

  const handleSearch = () => {
    onSearch();
  };

  const handleReset = () => {
    clearAllFilters();
    onSearch();
  };

  // 활성 필터가 없으면 컴포넌트를 간단하게 표시
  if (activeFilters.length === 0) {
    return (
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-medium">검색 필터</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="검색 조건 선택..." />
            </SelectTrigger>
            <SelectContent>
              {availableFields.map((config) => (
                <SelectItem key={config.field} value={config.field}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addFilter} disabled={!selectedField} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            필터 추가
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="font-medium">검색 필터</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {activeFilters.length}개 적용 중
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          모든 필터 지우기
        </Button>
      </div>

      {/* 필터 추가 */}
      {availableFields.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="검색 조건 선택..." />
            </SelectTrigger>
            <SelectContent>
              {availableFields.map((config) => (
                <SelectItem key={config.field} value={config.field}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addFilter} disabled={!selectedField} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            필터 추가
          </Button>
        </div>
      )}

      {/* 활성 필터들 */}
      <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
        {activeFilters.map((filter) => (
          <div key={filter.field} className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFilter(filter.field)}
              className="h-9 w-9 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <Badge variant="outline" className="min-w-16 justify-center">
              {filter.label}
            </Badge>
            <div className="flex-1">{renderFilterInput(filter)}</div>
          </div>
        ))}
      </div>

      {/* 검색 버튼 */}
      <div className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            초기화
          </Button>
          <Button size="sm" onClick={handleSearch}>
            검색 실행
          </Button>
        </div>
      </div>
    </div>
  );
}

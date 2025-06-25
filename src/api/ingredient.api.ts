import mainApi from "@/lib/main.axios";
import {
  SearchIngredientRequest,
  CreateIngredientRequest,
  UpdateIngredientRequest,
} from "@/types/ingredient.type";
import { RtnCommonType } from "@/types/commonType";

// basic path: /api/main
export const ingredientApi = {
  // 원료 목록 조회
  getIngredients: async (
    params?: SearchIngredientRequest
  ): Promise<RtnCommonType> => {
    const response = await mainApi.get("/ingredient", { params });
    return response.data;
  },

  // 원료 상세 조회
  getIngredient: async (id: number) => {
    const response = await mainApi.get(`/ingredient/${id}`);
    return response.data;
  },

  // 원료 생성
  createIngredient: async (
    createIngredientRequest: CreateIngredientRequest
  ) => {
    const response = await mainApi.post("/ingredient", createIngredientRequest);
    return response.data;
  },

  // 원료 수정
  updateIngredient: async (
    id: number,
    updateIngredientRequest: UpdateIngredientRequest
  ) => {
    const response = await mainApi.put(
      `/ingredient/${id}`,
      updateIngredientRequest
    );
    return response.data;
  },

  // 원료 삭제
  deleteIngredient: async (id: number) => {
    const response = await mainApi.delete(`/ingredient/${id}`);
    return response.data;
  },
};

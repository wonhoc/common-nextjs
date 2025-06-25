import { ingredientApi } from "@/api/ingredient.api";
import {
  SearchIngredientRequest,
  CreateIngredientRequest,
  GetIngredientResponseDto,
} from "@/types/ingredient.type";
import { RtnCommonType } from "@/types/commonType";

// 원료 목록 조회
export const getIngredients = async (
  searchIngredientRequest: SearchIngredientRequest
): Promise<RtnCommonType> => {
  const res = await ingredientApi.getIngredients(searchIngredientRequest);

  return res;
};

// 원료 상세 조회
export const getIngredient = async (
  id: number
): Promise<GetIngredientResponseDto> => {
  const res = await ingredientApi.getIngredient(id);

  return res;
};

// 원료 작성
export const createIngredient = async (
  createIngredientRequest: CreateIngredientRequest
): Promise<RtnCommonType> => {
  const res = await ingredientApi.createIngredient(createIngredientRequest);

  return res;
};

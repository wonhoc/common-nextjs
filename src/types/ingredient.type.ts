export type SearchIngredientRequest = {
  keyword: string;
  limit: number;
  page?: number;
};

export type CreateIngredientRequest = {
  nameEnglish: string;
  nameKorean: string;
  casNo: string;
  func: string;
};

export type UpdateIngredientRequest = {
  nameEnglish: string;
  nameKorean: string;
  casNo: string;
  func: string;
};

export type GetIngredientResponseDto = {
  id: number;
  nameEnglish: string;
  nameKorean: string;
  casNo: string;
  func: string;
};

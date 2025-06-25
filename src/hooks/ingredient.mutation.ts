import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getIngredients,
  getIngredient,
  createIngredient,
} from "@/service/ingredient.service";
import {
  SearchIngredientRequest,
  GetIngredientResponseDto,
  CreateIngredientRequest,
} from "@/types/ingredient.type";
import { useRouter } from "next/navigation";
import { RtnCommonType } from "@/types/commonType";
import { useEffect } from "react";

export const useIngredients = (searchParams: SearchIngredientRequest) => {
  const queryClient = useQueryClient();

  const query = useQuery<RtnCommonType, Error>({
    queryKey: ["ingredients", searchParams],
    queryFn: () => getIngredients(searchParams),
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
    }
  }, [query.isSuccess, query.data?.data, queryClient]);

  useEffect(() => {
    if (query.isError && query.error) {
    }
  }, [query.isError, query.error]);

  return query;
};

export const useIngredient = (id: number): UseQueryResult<RtnCommonType> => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getIngredient(id),
  });
};

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RtnCommonType, Error, CreateIngredientRequest>({
    mutationFn: createIngredient,
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });

      router.push("/board");
    },
    onError: (error: Error) => {
      console.error("Board creation error:", error);
    },
  });
};

import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { getBoards, getBoard, createBoard } from "@/service/board.service";
import { SearchBoardRequest, CreateBoardRequest } from "@/types/board.type";
import { useRouter } from "next/navigation";
import { RtnCommonType } from "@/types/commonType";
import { useEffect } from "react";

export const useBoards = (searchParams: SearchBoardRequest) => {
  const queryClient = useQueryClient();

  const query = useQuery<RtnCommonType, Error>({
    queryKey: ["boards", searchParams],
    queryFn: () => getBoards(searchParams),
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

export const useBoard = (id: number): UseQueryResult<RtnCommonType> => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoard(id),
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RtnCommonType, Error, CreateBoardRequest>({
    mutationFn: createBoard,
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });

      router.push("/board");
    },
    onError: (error: Error) => {
      console.error("Board creation error:", error);
    },
  });
};

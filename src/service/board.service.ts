import { boardApi } from "@/api/board.api";
import {
  SearchBoardRequest,
  CreateBoardRequest,
  GetBoardResponse,
} from "@/types/board.type";
import { RtnCommonType } from "@/types/commonType";

// 게시글 목록 조회
export const getBoards = async (
  searchBoardRequest: SearchBoardRequest
): Promise<RtnCommonType> => {
  const res = await boardApi.getBoards(searchBoardRequest);

  return res;
};

// 게시글 상세 조회
export const getBoard = async (id: number): Promise<GetBoardResponse> => {
  const res = await boardApi.getBoard(id);

  return res;
};

// 게시글 작성
export const createBoard = async (
  createBoardRequest: CreateBoardRequest
): Promise<RtnCommonType> => {
  const res = await boardApi.createBoard(createBoardRequest);

  return res;
};

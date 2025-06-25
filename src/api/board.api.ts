import mainApi from "@/lib/main.axios";
import {
  SearchBoardRequest,
  CreateBoardRequest,
  UpdateBoardRequest,
} from "@/types/board.type";
import { RtnCommonType } from "@/types/commonType";

// basic path: /api/main
export const boardApi = {
  getBoards: async (params?: SearchBoardRequest): Promise<RtnCommonType> => {
    const response = await mainApi.get("/board", { params });
    return response.data;
  },

  // 게시글 상세 조회
  getBoard: async (id: number) => {
    const response = await mainApi.get(`/board/${id}`);
    return response.data;
  },

  // 게시글 생성
  createBoard: async (boardData: CreateBoardRequest) => {
    const response = await mainApi.post("/board", boardData);
    return response.data;
  },

  // 게시글 수정
  updateBoard: async (id: number, boardData: UpdateBoardRequest) => {
    const response = await mainApi.put(`/board/${id}`, boardData);
    return response.data;
  },

  // 게시글 삭제
  deleteBoard: async (id: number) => {
    const response = await mainApi.delete(`/board/${id}`);
    return response.data;
  },
};

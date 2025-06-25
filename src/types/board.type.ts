import { BasePagination } from "./commonType";

export interface SearchBoardRequest extends BasePagination {
  title?: string;
  content?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateBoardRequest {
  title: string;
  content: string;
}

export interface UpdateBoardRequest {
  id: number;
  title: string;
  content: string;
}

export interface GetBoardsResponse {
  data: GetItems;
}

export interface GetItems {
  items: GetBoardResponse[];
}

export interface GetBoardResponse {
  id: number;
  title: string;
  content: string;
  createDtm?: Date;
}

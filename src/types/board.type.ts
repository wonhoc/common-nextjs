export type SearchBoardRequest = {
  keyword: string;
  limit: 3;
  page?: number;
};

export type CreateBoardRequest = {
  title: string;
  content: string;
};

export type UpdateBoardRequest = {
  id: number;
  title: string;
  content: string;
};

export type GetBoardsResponse = {
  data: GetItems;
};

export type GetItems = {
  items: GetBoardResponse[];
};

export type GetBoardResponse = {
  id: number;
  title: string;
  content: string;
  createDtm?: Date;
};

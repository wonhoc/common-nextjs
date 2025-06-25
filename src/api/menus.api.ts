import mainApi from "@/lib/main.axios";
import { RtnCommonType } from "@/types/commonType";
import { CreateMenuRequest } from "@/types/menu";

// basic path: /api/main
export const menusApi = {
  getMenus: async (): Promise<RtnCommonType> => {
    const response = await mainApi.get("/menus/tree");

    return response.data;
  },

  getMenu: async (menuId: number): Promise<RtnCommonType> => {
    const response = await mainApi.get(`/menus/${menuId}`);

    return response.data;
  },

  createMenus: async (
    createMenuRequest: CreateMenuRequest
  ): Promise<RtnCommonType> => {
    const response = await mainApi.post("/menus", createMenuRequest);

    return response.data;
  },

  updateMenus: async (
    menuId: number,
    createMenuRequest: CreateMenuRequest
  ): Promise<RtnCommonType> => {
    const response = await mainApi.patch(`/menus/${menuId}`, createMenuRequest);

    return response.data;
  },

  deleteMenus: async (menuId: number): Promise<RtnCommonType> => {
    const response = await mainApi.delete(`/menus/${menuId}`);

    return response.data;
  },
};

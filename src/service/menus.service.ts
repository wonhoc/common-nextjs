import { menusApi } from "@/api/menus.api";
import { RtnCommonType } from "@/types/commonType";
import { CreateMenuRequest } from "@/types/menu";

// 메뉴 목록 조회
export const getMenus = async (): Promise<RtnCommonType> => {
  const res = await menusApi.getMenus();

  return res;
};

// 메뉴 상세 조회
export const getMenu = async (menuId: number): Promise<RtnCommonType> => {
  console.log(menuId);
  const res = await menusApi.getMenu(menuId);

  console.log();

  return res;
};

// 메뉴 생성
export const createMenus = async (
  createMenuRequest: CreateMenuRequest
): Promise<RtnCommonType> => {
  const res = await menusApi.createMenus(createMenuRequest);

  return res;
};

// 메뉴 수정
export const updateMenus = async (
  menuId: number,
  createMenuRequest: CreateMenuRequest
): Promise<RtnCommonType> => {
  const res = await menusApi.updateMenus(menuId, createMenuRequest);

  return res;
};

// 메뉴 삭제
export const deleteMenus = async (menuId: number): Promise<RtnCommonType> => {
  const res = await menusApi.deleteMenus(menuId);

  return res;
};

import type { MenuItem } from "@/types/menu";

// 메뉴 생성
export async function createMenu(
  menuData: Omit<
    MenuItem,
    "id" | "createdDtm" | "updatedDtm" | "children" | "hasChildren"
  >
): Promise<MenuItem> {
  // 실제로는 API 호출
  // const response = await fetch('/api/menus', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(menuData)
  // })
  // return response.json()

  // 임시 구현
  const newMenu: MenuItem = {
    ...menuData,
    id: Date.now(),
    createdDtm: new Date().toISOString(),
    updatedDtm: new Date().toISOString(),
    children: [],
    hasChildren: false,
  };
  return newMenu;
}

// 메뉴 수정
export async function updateMenu(
  id: number,
  menuData: Partial<MenuItem>
): Promise<MenuItem> {
  // 실제로는 API 호출
  // const response = await fetch(`/api/menus/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(menuData)
  // })
  // return response.json()

  // 임시 구현
  const updatedMenu: MenuItem = {
    ...menuData,
    id,
    updatedDtm: new Date().toISOString(),
  } as MenuItem;
  return updatedMenu;
}

// 메뉴 삭제
export async function deleteMenu(id: number): Promise<boolean> {
  // 실제로는 API 호출
  // const response = await fetch(`/api/menus/${id}`, {
  //   method: 'DELETE'
  // })
  // return response.ok

  // 임시 구현
  return true;
}

// 메뉴 순서 변경
export async function updateMenuOrder(
  menuId: number,
  newOrder: number
): Promise<boolean> {
  // 실제로는 API 호출
  return true;
}

// 아이콘 목록 가져오기
export function getAvailableIcons(): string[] {
  return [
    "home",
    "users",
    "settings",
    "bell",
    "message-square",
    "help-circle",
    "file-text",
    "bar-chart-3",
    "shield",
    "menu",
    "layout-grid",
    "folder",
    "star",
    "heart",
    "bookmark",
    "calendar",
    "clock",
    "mail",
    "phone",
    "map-pin",
    "camera",
    "image",
    "video",
    "music",
    "headphones",
    "mic",
    "volume-2",
    "wifi",
    "bluetooth",
    "battery",
    "power",
    "refresh-cw",
    "download",
    "upload",
    "share",
    "link",
    "external-link",
    "eye",
    "eye-off",
    "lock",
    "unlock",
    "key",
    "user-check",
    "user-plus",
    "user-minus",
    "user-x",
    "users-2",
    "team",
    "building",
    "briefcase",
    "credit-card",
    "dollar-sign",
  ];
}

// 권한 목록 가져오기
export function getAvailablePermissions(): string[] {
  return [
    "MENU_USER_MGMT",
    "MENU_BOARD_MGMT",
    "MENU_NOTICE_MGMT",
    "MENU_FREE_MGMT",
    "MENU_QNA_MGMT",
    "MENU_SYSTEM_SETTINGS",
    "MENU_MENU_MGMT",
    "MENU_PERMISSION_MGMT",
    "MENU_STATISTICS",
    "MENU_DASHBOARD",
    "MENU_REPORTS",
    "MENU_LOGS",
    "MENU_BACKUP",
    "MENU_MAINTENANCE",
  ];
}

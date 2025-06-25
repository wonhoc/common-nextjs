export interface MenuItem {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  parentId: number | null;
  sortOrder: number;
  level: number;
  isActive: boolean;
  isVisible: boolean;
  type: string;
  permission: string;
  config: string;
  createdDtm: string;
  updatedDtm: string;
  createdBy: string;
  updatedBy: string;
  children: MenuItem[];
  hasChildren: boolean;
}

export interface MenuConfig {
  target?: string;
  [key: string]: any;
}

export type CreateMenuRequest = {
  name?: string;
  description?: string;
  url?: string;
  icon: string;
  parentId?: number | null | undefined;
  sortOrder?: number;
  level?: number;
  isActive?: boolean;
  isVisible?: boolean;
  type?: string;
  permission?: string;
  config?: string;
};

export interface UpdateMenuRequest {
  menuId: number;
  data: CreateMenuRequest;
}

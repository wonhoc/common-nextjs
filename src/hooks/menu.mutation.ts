import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RtnCommonType } from "@/types/commonType";
import {
  getMenus,
  getMenu,
  createMenus,
  updateMenus,
  deleteMenus,
} from "@/service/menus.service";
import { useRouter } from "next/navigation";
import { CreateMenuRequest, UpdateMenuRequest } from "@/types/menu";

export const useMenus = () => {
  return useQuery<RtnCommonType, Error>({
    queryKey: ["menus"],
    queryFn: () => getMenus(),
  });
};

export const useMenu = (menuId: number) => {
  return useQuery<RtnCommonType, Error>({
    queryKey: ["menu", menuId],
    queryFn: () => getMenu(menuId),
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RtnCommonType, Error, CreateMenuRequest>({
    mutationFn: createMenus,
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });

      router.push("/setting/menus");
    },
    onError: (error: Error) => {
      console.error("Menu creation error:", error);
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RtnCommonType, Error, UpdateMenuRequest>({
    mutationFn: ({ menuId, data }) => updateMenus(menuId, data),
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });

      router.push("/setting/menus");
    },
    onError: (error: Error) => {
      console.error("Menu creation error:", error);
    },
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation<RtnCommonType, Error, number>({
    mutationFn: deleteMenus,
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (error: Error) => {
      console.error("Menu creation error:", error);
    },
  });
};

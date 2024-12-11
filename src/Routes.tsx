import { dest_root } from "../target_config";

export const ROUTES = {
  HOME: `${dest_root}/`,
  PARTS: `${dest_root}/parts`,
  LOGIN: `${dest_root}/login`,
  REGISTER: `${dest_root}/register`,
  PROFILE: `${dest_root}/profile`,
  SHIPMENTS: `${dest_root}/shipments`,
  PAGE403: `${dest_root}/403`,
  PAGE404: `${dest_root}/404`,
};
export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  PARTS: "Комплектующие",
  LOGIN: "Аутентификация",
  REGISTER: "Регистрация",
  PROFILE: "Профиль",
  SHIPMENTS: "Отправки",
  PAGE403: "Доступ запрещен",
  PAGE404: "Страница не найдена"
};

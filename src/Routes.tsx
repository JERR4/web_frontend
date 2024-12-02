import { dest_root } from "../target_config";

export const ROUTES = {
  HOME: `${dest_root}/`,
  PARTS: `${dest_root}/parts`,
};
export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  PARTS: "Комплектующие",
};

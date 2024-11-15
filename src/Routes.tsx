export const ROUTES = {
  HOME: "/",
  PARTS: "/parts",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  PARTS: "Комплектующие",
};
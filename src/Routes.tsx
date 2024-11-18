export const ROUTES = {
  HOME: "/web_frontend",
  PARTS: "/web_frontend/parts",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  PARTS: "Комплектующие",
};
import http from "./httpService";

export function getTypes() {
  return http.get("/types");
}

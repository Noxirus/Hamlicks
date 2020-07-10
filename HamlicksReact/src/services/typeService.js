import http from "./httpService";
import { apiUrl } from "../config.json";

export function getTypes() {
  return http.get(apiUrl + "/types");
}

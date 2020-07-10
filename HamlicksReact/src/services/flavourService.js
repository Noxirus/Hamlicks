import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/flavours";

function flavourUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFlavours() {
  return http.get(apiEndpoint);
}

export function getFlavour(flavourId) {
  return http.get(flavourUrl(flavourId));
}

export function deleteFlavour(flavourId) {
  http.delete(flavourUrl(flavourId));
}

export function saveFlavour(flavour) {
  if (flavour._id) {
    const body = { ...flavour };
    delete body._id;
    return http.put(flavourUrl(flavour._id), body);
  } else {
    return http.post(apiEndpoint, flavour);
  }
}

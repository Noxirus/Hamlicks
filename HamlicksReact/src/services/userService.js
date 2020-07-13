import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export async function register(user) {
  return await http.post(apiEndpoint, {
    email: user.email,
    name: user.name,
    password: user.password,
  });
}

export function deleteUser(userId) {
  http.delete(userUrl(userId));
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}

//TODO for backend services you will want to add an update password as well as attach it to this service

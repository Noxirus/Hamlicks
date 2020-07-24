import http from "./httpService";

const apiEndpoint = "/users";

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
    favorites: [],
  });
}

export function deleteUser(userId) {
  http.delete(userUrl(userId));
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}

export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  } else {
    return http.post(apiEndpoint, user);
  }
}

//TODO for backend services you will want to add an update password as well as attach it to this service

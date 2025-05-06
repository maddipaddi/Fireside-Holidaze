// utils/auth.mjs

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function saveUserSession(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
}

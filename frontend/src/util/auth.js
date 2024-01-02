import { redirect } from "react-router-dom";

export function getTokenExpirationDuration() {
  const storedTokenExpiration = localStorage.getItem("expiration");
  const expiration = new Date(storedTokenExpiration);
  const now = new Date();
  const duration =expiration.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenExpirationDuration();
  if (!token) {
    return null;
  }
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    redirect("/auth");
  }
  return null;
}

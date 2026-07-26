import apiRequest from "../api/apiClient";

export async function getHealthStatus() {
  return apiRequest("/health");
}
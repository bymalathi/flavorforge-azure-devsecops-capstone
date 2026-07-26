import apiRequest from "./apiClient";

async function getRecipes() {
  return apiRequest("/recipes");
}

export { getRecipes };
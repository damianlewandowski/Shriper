import axios from "@/axiosInstance";
import type { Recipe } from "@/generated-types";
import { useQuery } from "@tanstack/react-query";

export const GET_RECIPES_KEY = "recipes";

async function fetchRecipes() {
  const res = await axios.get<Recipe[]>("/api/Recipes");
  return res.data;
}

export const useGetRecipesQuery = () => {
  return useQuery({
    queryKey: [GET_RECIPES_KEY],
    queryFn: fetchRecipes,
  });
};

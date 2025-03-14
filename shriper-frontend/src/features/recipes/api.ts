import axios from "@/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchRecipes() {
  const res = await axios.get<any[]>("http://localhost:5041/api/Recipes", {});
  return res.data;
}

const GET_RECIPES_KEY = "recipes";
export const useGetRecipesQuery = () => {
  return useQuery({
    queryKey: [GET_RECIPES_KEY],
    queryFn: fetchRecipes,
  });
};

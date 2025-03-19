import axios from "@/axiosInstance";
import type { CreateRecipeDto, Recipe } from "@/generated-types";
import { handleError } from "@/lib/validation-error";
import queryClient from "@/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";

export const GET_RECIPES = "GET_RECIPES";

async function getRecipes() {
  const res = await axios.get<Recipe[]>("/api/Recipes");
  return res.data;
}

export function useGetRecipesQuery() {
  return useQuery({
    queryKey: [GET_RECIPES],
    queryFn: getRecipes,
  });
}

export async function createRecipe(
  recipeData: CreateRecipeDto
): Promise<Recipe | undefined> {
  try {
    const res = await axios.post<Recipe>("/api/recipes", recipeData);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export function useCreateRecipeMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: (recipe: Recipe | undefined) => {
      console.log("Recipe created:", recipe);
      queryClient.invalidateQueries({ queryKey: [GET_RECIPES] }); // Invalidate any recipe list queries
      navigate({ to: `/` });
    },
    onError: (error: any, variables: CreateRecipeDto, context?: unknown) => {
      console.error("Error creating recipe:", error);
      // Error handling will be done in the component
    },
  });
}

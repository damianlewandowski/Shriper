import LoadingSpinner from "@/components/ui/loading-spinner";
import { useGetRecipesQuery } from "./api";

const RecipesList = () => {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <LoadingSpinner />
        <span className="ml-2">Loading recipes...</span>{" "}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading recipes.</p>; // Handle error state
  }

  return (
    <ul>{recipes?.map((recipe) => <li key={recipe.id}>{recipe.title}</li>)}</ul>
  );
};

export default RecipesList;

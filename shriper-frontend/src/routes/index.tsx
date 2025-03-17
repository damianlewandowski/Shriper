import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import { useGetRecipesQuery } from "@/features/recipes/api";
import RecipesList from "@/features/recipes/RecipesList";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <RecipesList />
    </div>
  );
}

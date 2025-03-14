import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import { useGetRecipesQuery } from "@/features/recipes/api";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data: recipes } = useGetRecipesQuery();

  return (
    <div className="text-center">
      <ul>{recipes?.map((recipe) => <li>{recipe.title}</li>)}</ul>
    </div>
  );
}

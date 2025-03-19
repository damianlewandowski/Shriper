import AddRecipe from "@/features/recipes/AddRecipe";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddRecipe />;
}

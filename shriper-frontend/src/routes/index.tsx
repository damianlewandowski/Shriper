import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  React.useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("http://localhost:5041/api/Recipes", {
        credentials: "include",
      });
      console.log(res);
    }

    fetchRecipes();
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}

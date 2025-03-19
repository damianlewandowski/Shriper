import { Input } from "@/components/ui/input";
import AddRecipeButton from "./AddRecipeButton";
import RecipesList from "./RecipesList";

const Recipes = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-grow mx-4 md:mx-6 md:max-w-80">
          <Input type="text" placeholder="Search..." />
        </div>
        <AddRecipeButton />
      </div>
      <div className="w-full mx-auto">
        <RecipesList />
      </div>
    </div>
  );
};

export default Recipes;

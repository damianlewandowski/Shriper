import React from "react";
import AddRecipeForm from "./AddRecipeForm";
import { H1 } from "@/components/ui/typography";

type Props = {};

const AddRecipe = () => {
  return (
    <div>
      <H1>Add recipe</H1>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipe;

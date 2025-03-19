import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React from "react";

type Props = {};

const AddRecipeButton = (props: Props) => {
  return (
    <Link to="/recipes/add">
      <Button size={"xl"} variant="primary">
        Add recipe
      </Button>
    </Link>
  );
};

export default AddRecipeButton;

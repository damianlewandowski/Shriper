import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateRecipeMutation } from "./api";
import type { CreateRecipeValidationErrorResponse } from "@/generated-types";
import type { AxiosError } from "axios";

// Define the Zod schema for Ingredient
const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.string().min(1, "Amount is required"),
});

// Define the Zod schema for CreateRecipeDto
const createRecipeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters.")
    .max(100, "Title must contain at most 100 characters."),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "At least one ingredient is required"),
  instructions: z
    .string()
    .min(10, "Instructions must be at least 10 characters long"),
  vitalInstructions: z.string().optional(),
});

type CreateRecipeFormValues = z.infer<typeof createRecipeSchema>;

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const {
    data,
    mutateAsync: createRecipe,
    isPending,
  } = useCreateRecipeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      ingredients: [{ name: "", amount: "" }],
      instructions: "",
      vitalInstructions: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: CreateRecipeFormValues) => {
    try {
      const res = await createRecipe({ ...data });
      // TODO: Navigate to detail page of recipe. FOr now back to homepage
      navigate({ to: "/" });
    } catch (error: unknown) {
      const validationErrors = error as CreateRecipeValidationErrorResponse;

      for (let validationError in validationErrors) {
        const message =
          validationErrors[
            validationError as keyof CreateRecipeValidationErrorResponse
          ]?.join(" ");
        setError(validationError as keyof CreateRecipeValidationErrorResponse, {
          type: "server",
          message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 space-y-8 max-w-2xl mx-auto"
    >
      <div className="col-span-12">
        <Label htmlFor="title" className="text-lg">
          Title
        </Label>
        <Input id="title" placeholder="Recipe title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="col-span-12 space-2">
        <Label className="text-lg">Ingredients</Label>
        <ul>
          {fields.map((field, index) => (
            <li
              key={field.id}
              className="grid grid-cols-12 flex items-center space-x-2 mb-2"
            >
              <div className="col-span-7">
                <Label htmlFor={`ingredients.${index}.name`}>Name</Label>

                <Input
                  id={`ingredients.${index}.name`}
                  placeholder="Ingredient name"
                  {...register(`ingredients.${index}.name`)}
                />
              </div>

              <div className="col-span-5 items-center">
                <Label htmlFor={`ingredients.${index}.amount`}>Amount</Label>
                <div className="flex-1 flex">
                  <Input
                    id={`ingredients.${index}.amount`}
                    placeholder="e.g., 1 cup, 2 tbsp"
                    {...register(`ingredients.${index}.amount`)}
                  />
                  <Button
                    className="ml-2"
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <div className="col-span-7">
                {errors.ingredients?.[index]?.name && (
                  <p className="text-red-500 text-sm">
                    {errors.ingredients[index].name?.message}
                  </p>
                )}
              </div>
              <div className="col-span-5">
                {errors.ingredients?.[index]?.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.ingredients[index].amount?.message}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          size="sm"
          onClick={() => append({ name: "", amount: "" })}
        >
          Add Ingredient
        </Button>
        {errors.ingredients && errors.ingredients.message && (
          <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
        )}
      </div>

      <div className="col-span-12">
        <Label htmlFor="instructions" className="text-lg">
          Instructions
        </Label>
        <Textarea
          className="h-40"
          id="instructions"
          placeholder="Step-by-step instructions"
          {...register("instructions")}
        />
        {errors.instructions && (
          <p className="text-red-500 text-sm">{errors.instructions.message}</p>
        )}
      </div>

      <div className="col-span-12">
        <Label htmlFor="vitalInstructions" className="text-lg">
          Vital Instructions (Optional)
        </Label>
        <Textarea
          id="vitalInstructions"
          placeholder="Important notes or tips"
          {...register("vitalInstructions")}
        />
        {errors.vitalInstructions && (
          <p className="text-red-500 text-sm">
            {errors.vitalInstructions.message}
          </p>
        )}
      </div>

      <div className="col-span-12">
        <Button
          type="submit"
          isLoading={isPending}
          variant={"primary"}
          size={"xl"}
        >
          Create Recipe
        </Button>
      </div>
    </form>
  );
};

export default AddRecipeForm;

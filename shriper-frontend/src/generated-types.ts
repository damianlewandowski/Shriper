//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface BaseModel {
    createdAt?: Date;
    updatedAt?: Date | undefined;
}

export interface Recipe extends BaseModel {
    id: number;
    title: string;
    ingredients: Ingredient[];
    instructions: string;
    vitalInstructions?: string;
}

export interface Ingredient extends BaseModel {
    id: number;
    name: string;
    amount: string;
}

export interface CreateRecipeValidationErrorResponse {
    title?: string[];
    ingredients?: CreateIngredientDtoValidationError[];
    instructions?: string[];
    vitalInstructions?: string[];
}

export interface CreateIngredientDtoValidationError {
    name?: string[];
    amount?: string[];
}

export interface CreateRecipeDto {
    title: string;
    ingredients: CreateIngredientDto[];
    instructions: string;
    vitalInstructions?: string;
}

export interface CreateIngredientDto {
    name: string;
    amount: string;
}

export interface UserDto extends BaseModel {
    id: number;
    email: string;
    profilePictureUrl?: string | undefined;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}
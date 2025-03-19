import { AxiosError } from "axios";

export const StatusCodes = {
  BAD_REQUEST: 400,
};

interface ValidationErrorObject {
  [key: string]: string[];
}

const transformValidationErrors = (error: unknown): ValidationErrorObject => {
  const axiosError = error as AxiosError<{ errors: ValidationErrorObject }>;
  if (axiosError?.response?.data.errors) {
    const validationErrors: ValidationErrorObject = {};
    const responseData = axiosError.response.data.errors;

    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        const lowercaseKey = key.toLowerCase();
        validationErrors[lowercaseKey] = responseData[key];
      }
    }

    return validationErrors;
  }
  return { message: ["An unexpected error occurred."] };
};

export const handleError = (error: unknown): never => {
  // Internal error, not related to http requests
  if (!(error as AxiosError).isAxiosError) {
    throw error;
  }

  const status = (error as AxiosError).status;
  console.log("status", status);

  // TODO: Handle more status codes
  switch (status) {
    case StatusCodes.BAD_REQUEST: {
      const transformedErrors = transformValidationErrors(error);
      throw transformedErrors;
    }

    default: {
      throw error;
    }
  }
};

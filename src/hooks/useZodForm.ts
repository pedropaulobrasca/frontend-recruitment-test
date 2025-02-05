import { useState } from 'react';
import { z } from 'zod';

interface FormState<T> {
  values: Partial<T>;
  errors: Record<string, string>;
}

export function useZodForm<T>(schema: z.ZodSchema<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: {},
    errors: {},
  });

  const validate = (data: FormData): boolean => {
    try {
      const formObject = Object.fromEntries(data.entries());
      schema.parse(formObject);
      setFormState(prev => ({ ...prev, errors: {} }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormState(prev => ({ ...prev, errors }));
      }
      return false;
    }
  };

  const getFieldError = (fieldName: keyof T): string | undefined => {
    return formState.errors[fieldName as string];
  };

  return {
    validate,
    getFieldError,
    errors: formState.errors,
  };
}

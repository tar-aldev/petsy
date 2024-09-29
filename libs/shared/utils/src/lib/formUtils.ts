import type { FieldErrors } from '@petsy/shared-types';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { SafeParseError } from 'zod';

export const mapErrorsValidationResultToFormErrors = <FormValues>(
  errorsValidationResult: SafeParseError<FormValues>
) => {
  const fieldsErrors = errorsValidationResult.error.flatten().fieldErrors;
  const mappedFieldsErrors: FieldErrors<FormValues>['errors'] = {};

  Object.keys(fieldsErrors).forEach((fieldName) => {
    const typedFieldName = fieldName as keyof typeof fieldsErrors;
    if (
      typedFieldName in fieldsErrors &&
      (fieldsErrors[typedFieldName] ?? []).length > 0
    ) {
      mappedFieldsErrors[typedFieldName] = fieldsErrors[typedFieldName]?.[0];
    }
  });

  return mappedFieldsErrors;
};

export const setValidationErrors = <FormValues extends FieldValues>(
  errors: Partial<Record<keyof FormValues, string | undefined>>,
  setError: UseFormSetError<FormValues>
) => {
  Object.entries(errors).forEach(([errKey, errMessage]) => {
    if (errMessage) {
      setError(errKey as Path<FormValues>, {
        message: errMessage,
      });
    }
  });
};

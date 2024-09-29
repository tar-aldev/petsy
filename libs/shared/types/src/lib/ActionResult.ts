export type Error = {
  error?: string;
};

export type Success = { success: string };

export type FieldErrors<FormValues> = {
  errors: Partial<Record<keyof FormValues, string>>;
};

export type FormActionFailure<FormValues> = Error | FieldErrors<FormValues>;

export type FormActionResponse<FormValues> =
  | FormActionFailure<FormValues>
  | Success;

export const isFormError = <FormValues>(
  result: Success | FormActionFailure<FormValues>
): result is Required<Error> => {
  return !!(result as Error)?.error;
};

export const isFieldsError = <FormValues>(
  result: Success | FormActionFailure<FormValues>
): result is FieldErrors<FormValues> => {
  return !!(result as FieldErrors<FormValues>)?.errors;
};

export const isFormActionSuccess = <FormValues>(
  result: Success | FormActionFailure<FormValues>
): result is Success => {
  return !!(result as Success).success;
};

export const isActionSuccess = (result: Success | Error): result is Success => {
  return !!(result as Success)?.success;
};

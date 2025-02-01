export type UserFacingError = {
  primaryMessage: string;
  secondaryMessage: string;
};

const defaultErrorMessage: UserFacingError = {
  primaryMessage: 'Something went wrong',
  secondaryMessage: 'An unexpected error occurred. Please try again later.',
};

// Object to store mappers
const errorMappers: Record<
  string,
  (code: string) => UserFacingError | undefined
> = {};

// Function to register new mappers dynamically
// export const registerErrorMapper = (
//   key: string,
//   mapper: (code: string) => UserFacingError | undefined
// ) => {
//   errorMappers[key] = mapper;
// };

// Combined error mapper function
export const registerErrorMapper = (
  key: string,
  mapper: (code: string) => UserFacingError | undefined
) => {
  errorMappers[key] = mapper;

  return (code: string): UserFacingError => {
    for (const mapper of Object.values(errorMappers)) {
      const result = mapper(code);
      if (result) return result;
    }
    return defaultErrorMessage; // Fallback if no mapper handles the code
  };
};

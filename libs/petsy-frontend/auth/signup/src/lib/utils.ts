import { registerErrorMapper } from '@petsy/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const getError = registerErrorMapper('sign-up', (code) => {
  switch (code) {
    case 'missing_requirements': {
      return {
        primaryMessage: 'One or more required fields are missing',
        secondaryMessage:
          'Ensure you have put the neccessary information: email and password for the first step, email verifciation code for the seconds step.',
      };
    }
  }
});

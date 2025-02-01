import { registerErrorMapper } from '@petsy/utils';

export const getError = registerErrorMapper('sign_in', (code) => {
  switch (code) {
    case 'needs_identifier':
    case 'form_identifier_not_found':
      return {
        primaryMessage: 'Invalid credentials',
        secondaryMessage:
          'Either an account does not exist or the credentials are incorrect.',
      };
  }
});

import { Typography } from '@petsy/shared-components';
import { SignupForm } from './SignUpForm';

export function SignupPage() {
  return (
    <>
      <Typography muted className="mb-2">
        Create your Petsy account!
      </Typography>
      <Typography muted>
        You will be able to add more account information after registering
      </Typography>
      <div className="py-8">
        <SignupForm />
      </div>
    </>
  );
}

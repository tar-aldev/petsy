import { Typography } from '@petsy/shared-components';
import { LoginForm } from './LoginForm';

export async function LoginPage() {
  return (
    <>
      <Typography muted>Log In to your Petsy account!</Typography>
      <div className="pt-16">
        <LoginForm />
      </div>
    </>
  );
}

'use client';

import {
  Button,
  Form,
  FormControl,
  Input,
  Badge,
} from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { UserRound, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FacebookIcon from './facebook.svg';
import GoogleIcon from './google.svg';
import Link from 'next/link';

export function LoginForm() {
  const formProps = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit((values) => {
          console.log('values', values);
        })}
        className="space-y-6"
      >
        <FormControl>
          <Input name="email" placeholder="email@.com" startIcon={UserRound} />
        </FormControl>
        <Input
          name="password"
          placeholder="Insert your passowrd here"
          type="password"
          startIcon={KeyRound}
        />

        <div className="space-y-3">
          <Button className="w-full">Log in</Button>

          <Typography className="text-primary text-center">
            Forgot password?
          </Typography>
        </div>

        <div className="flex items-center">
          <hr className="flex-1" />
          <Badge className="uppercase" variant="light">
            or
          </Badge>
          <hr className="flex-1" />
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full" leftIcon={GoogleIcon}>
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full" leftIcon={FacebookIcon}>
            Sign in with Facebook
          </Button>
        </div>

        <hr />

        <div>
          <Typography muted className="text-center">
            Don't have an account?
          </Typography>

          <Button variant="link" className="w-full" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

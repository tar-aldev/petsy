'use client';

import {
  FormControl,
  Input,
  Button,
  Badge,
  Form,
} from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { UserRound, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { GoogleIcon, FacebookIcon } from '@petsy/icons';
import Link from 'next/link';

export function SignupForm() {
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

        <Button className="w-full">Sign up</Button>

        <div>
          <div className="flex items-center py-6">
            <hr className="flex-1" />
            <Badge className="uppercase" variant="light">
              or
            </Badge>
            <hr className="flex-1" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" leftIcon={GoogleIcon}>
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              leftIcon={FacebookIcon}
            >
              Sign up with Facebook
            </Button>
          </div>
        </div>
        <hr />

        <div>
          <Typography muted className="text-center">
            Already have an account?
          </Typography>

          <Button variant="link" className="w-full" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

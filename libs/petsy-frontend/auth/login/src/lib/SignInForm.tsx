'use client';

import {
  Button,
  Form,
  FormControl,
  Input,
  Badge,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { UserRound, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { FacebookIcon, GoogleIcon } from '@petsy/icons';
import type { UserFacingError } from '@petsy/utils';

export type SignInFormValues = {
  email: string;
  password: string;
};

export function SignInForm({
  error,
  handleSignIn,
}: {
  error?: UserFacingError;
  handleSignIn: (values: SignInFormValues) => void;
}) {
  const formProps = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(handleSignIn)}
        className="space-y-6"
      >
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@mail.com"
                    {...field}
                    startIcon={UserRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert your passowrd here"
                    type="password"
                    {...field}
                    startIcon={KeyRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="space-y-3">
          <Button className="w-full">Sign in</Button>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>{error.primaryMessage}</AlertTitle>
              <AlertDescription>{error.secondaryMessage}</AlertDescription>
            </Alert>
          )}
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
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

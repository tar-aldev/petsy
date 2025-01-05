'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FacebookIcon, GoogleIcon } from '@petsy/icons';
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@petsy/shadcn-components';
import { Typography } from '@petsy/shared-components';
import { KeyRound, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import type { SignUpFormValues } from './formValidation/signupFormValidation';
import { signupValidationSchema } from './formValidation/signupFormValidation';

export function SignupForm({
  handleSignup,
}: {
  handleSignup: (values: SignUpFormValues) => void;
}) {
  const formProps = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signupValidationSchema),
    reValidateMode: 'onChange',
  });

  return (
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(handleSignup)}
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
                <FormDescription>Minimum 8 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* {!!formError && (
          <div className="flex p-1 items-center gap-2">
            <ExclamationTriangleIcon className="text-red-400" />
            <Typography variant="p" className="text-red-400">
              {formError}
            </Typography>
          </div>
        )} */}
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
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

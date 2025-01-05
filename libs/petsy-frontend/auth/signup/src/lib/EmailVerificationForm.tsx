import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@petsy/shadcn-components';
import { useForm } from 'react-hook-form';

export type EmailVerificationFormValues = { verificationCode: string };

export function EmailVerificationForm({
  handleVerifyEmail,
}: {
  handleVerifyEmail: (values: EmailVerificationFormValues) => void;
}) {
  const formProps = useForm<EmailVerificationFormValues>({
    defaultValues: {
      verificationCode: '',
    },
    // resolver: zodResolver(signupValidationSchema),
    reValidateMode: 'onChange',
  });

  return (
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(handleVerifyEmail)}
        className="space-y-6"
      >
        <FormField
          name="verificationCode"
          control={formProps.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Verification code *</FormLabel>
                <FormControl>
                  <InputOTP {...field} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Enter the verification code that we sent to your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </Form>
  );
}

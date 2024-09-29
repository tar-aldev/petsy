import z from 'zod';

export const animalValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  birthDate: z.date().nullable(),
  breed: z.string(),
  sprayedOrNeutered: z.enum(['yes', 'no', 'unknown']),
  gender: z.enum(['Male', 'Female']),
  photos: z.array(z.instanceof(File)).default([]),
});

export type AnimalFormValues = z.infer<typeof animalValidationSchema>;

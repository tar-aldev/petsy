'use server';

import { auth } from '@petsy/auth-config/server';
import type { FormActionResponse } from '@petsy/shared-types';
import {
  animalValidationSchema,
  type AnimalFormValues,
} from './animal-form/validationSchema';
import { parseFormDataToFormValues } from './utils';
import { UTApi } from 'uploadthing/server';

import { mapErrorsValidationResultToFormErrors } from '@petsy/shared-utils';
import type { Photo } from '@petsy/db';
import { createUserAnimal } from '@petsy/db';
import { redirect } from 'next/navigation';

const utapi = new UTApi({
  apiUrl: 'animalProfilePictures',
});

const isDefined = (photo: Photo | null): photo is Photo => {
  return !!photo;
};

export async function addNewAnimal(
  formData: FormData
): Promise<FormActionResponse<AnimalFormValues>> {
  const currentUser = await auth();

  // validate formValues
  // store images to s3 or smth
  // insert form values into DB and use s3 links to photos instead of original photos field
  // append user_id using current session()
  if (!currentUser?.user?.id) {
    return {
      error: 'You are not allowed to add an animal.',
    };
  }
  const parsedFormData = parseFormDataToFormValues(formData);
  const parsedFormValues = animalValidationSchema.safeParse(parsedFormData);
  if (parsedFormValues.error) {
    return {
      errors: mapErrorsValidationResultToFormErrors(parsedFormValues),
    };
  }
  const {
    data: { photos, category, ...formValues },
  } = parsedFormValues;

  try {
    const mappedPhotos: Photo[] = [];
    if (photos && photos.length > 0) {
      const result = await utapi.uploadFiles(photos);

      const failedToLoadFiles = result.some((file) => !!file.error);

      if (failedToLoadFiles) {
        throw new Error('Unable to upload animal photos');
      }

      mappedPhotos.push(
        ...result
          .map(({ data }) => {
            if (data) {
              return { key: data.key };
            }

            return null;
          })
          .filter(isDefined)
      );
    }

    await createUserAnimal(
      { ...formValues, categoryId: category?.id },
      mappedPhotos,
      currentUser.user.id
    );
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to add an animal',
    };
  }

  return {
    success: 'Successfully added a new pet',
  };
}

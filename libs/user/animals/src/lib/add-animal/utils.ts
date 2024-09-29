import { add, parseISO, sub } from 'date-fns';
import { type AnimalFormValues } from './animal-form/validationSchema';

export const transformFormValuesToFormData = (formValues: AnimalFormValues) => {
  const formData = new FormData();

  for (const key in formValues) {
    const typedKey = key as keyof AnimalFormValues;

    switch (typedKey) {
      case 'birthDate': {
        formData.append(typedKey, JSON.stringify(formValues[typedKey]));
        break;
      }
      case 'category': {
        formData.append(typedKey, JSON.stringify(formValues[typedKey]));
        break;
      }
      case 'photos': {
        const selectedPhotos = formValues[typedKey];

        (selectedPhotos ?? []).forEach((photo) => {
          formData.append(typedKey, photo);
        });
        break;
      }
      default:
        formData.append(typedKey, formValues[typedKey]);
    }
  }

  return formData;
};

export const parseFormDataToFormValues = (formData: FormData) => {
  const parsedFormValues: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    const typedKey = key as keyof AnimalFormValues;
    switch (typedKey) {
      case 'birthDate': {
        const parsedISODate = JSON.parse(value as string);
        parsedFormValues.birthDate = parsedISODate
          ? sub(parseISO(parsedISODate), {
              minutes: parseISO(parsedISODate).getTimezoneOffset(),
            })
          : null;
        break;
      }
      case 'photos': {
        const currentParsedPhotos = parsedFormValues.photos;

        Array.isArray(currentParsedPhotos)
          ? currentParsedPhotos.push(value)
          : (parsedFormValues.photos = [value]);
        break;
      }
      case 'category':
        parsedFormValues.category = JSON.parse(value as string);
        break;
      default:
        parsedFormValues[key] = value;
    }
  });

  return parsedFormValues;
};

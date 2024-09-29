import { Button, Input } from '@petsy/shadcn-components';
import { X } from 'lucide-react';
import React, { useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { AnimalFormValues } from './validationSchema';

import { Typography } from '@petsy/shared-components';
import { ImagePlus } from 'lucide-react';

export default function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setValue, control } = useFormContext<AnimalFormValues>();
  const currentSelectedPhotos = useWatch({
    control,
    name: 'photos',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValue('photos', Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setValue(
      'photos',
      currentSelectedPhotos.filter((_, i) => i !== index)
    );
  };

  const onImageUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-4 justify-center">
      {currentSelectedPhotos.length > 0 && (
        <>
          {currentSelectedPhotos.map((file, index) => (
            <div
              key={index}
              className="rounded-md overflow-hidden relative w-28 h-28"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => handleRemoveFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </>
      )}
      <Button
        className="border-none bg-primary/50 p-0 w-28 h-28 rounded-md overflow-hidden hover:bg-primary/60 relative shadow-none"
        type="button"
        onClick={onImageUploadClick}
      >
        <span className="flex flex-col items-center justify-center">
          <ImagePlus width={50} height={50} />
          <Typography className="text-wrap">Upload an image</Typography>
        </span>
      </Button>
      <Input
        ref={inputRef}
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

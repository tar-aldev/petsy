import localFont from 'next/font/local';

export const sfProDisplay = localFont({
  src: [
    {
      path: './sf-pro-display/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './sf-pro-display/SF-Pro-Display-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

import { Inter, Oswald } from 'next/font/google';
import { StyleProp, MantineSize } from '@mantine/core';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const oswald = Oswald({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export function getTitleFontSize({
  titleLength,
  isMobile = false,
  titleSizeLimit = 50,
}: {
  titleLength: number;
  isMobile?: boolean;
  titleSizeLimit?: number;
}):
  | StyleProp<
      | number
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | MantineSize
      | (string & {})
    >
  | undefined {
  let baseTitleFontSize: string;

  if (titleLength > titleSizeLimit * 2) {
    // Use h4/h3 for names longer than twice the size limit
    baseTitleFontSize = isMobile ? 'h4' : 'h3';
  } else if (titleLength > titleSizeLimit) {
    // Use h3/h2 for names longer than titleSizeLimit
    baseTitleFontSize = isMobile ? 'h3' : 'h2';
  } else {
    // Use h1/h2 for names shorter or equal to titleSizeLimit
    baseTitleFontSize = isMobile ? 'h2' : 'h1';
  }

  return baseTitleFontSize;
}

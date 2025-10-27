import { useMediaQuery } from '@mantine/hooks';

export function useIsMobile(): boolean | undefined {
  // TODO - Make it use breakpoint from theme
  return useMediaQuery('(max-width: 48em)', false, {
    getInitialValueInEffect: true,
  });
}

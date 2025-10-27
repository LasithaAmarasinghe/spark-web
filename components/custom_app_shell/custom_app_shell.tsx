import { ReactNode } from 'react';
import {
  AppShell,
  Flex,
  Image,
  MantineSpacing,
  rem,
  UnstyledButton,
} from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Link from 'next/link';
import CustomDrawer from '@/components/custom_drawer/custom_drawer';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { images } from '@/utils/image_utils';
import CustomBackgroundImage from '@/components/custom_background_image/custom_background_image';

interface CustomAppShellProps {
  children: ReactNode;
  imageSrc?: string;
  backgroundHeight?: number | string;
  width?: number | string;
  padding?: MantineSpacing;
  bgSize?: string;
  pos?: string;
}

function CustomAppShell({
  imageSrc = '',
  backgroundHeight = 900,
  padding = 'md',
  children,
  bgSize = 'cover',
  pos = 'top center',
}: CustomAppShellProps) {
  // Becomes true after moving 30 pixels down the page
  const pinned = useHeadroom({ fixedAt: 30 });

  // Boolean value to determine if the device is mobile
  const isMobile = useIsMobile();

  return (
    <AppShell
      // Set the header configuration
      header={{
        height: 60,
        // Collapse the header on mobile devices when the user scrolls past 30px
        collapsed: isMobile ? !pinned : false,
        // Prevent offsetting the main content when the header is collapsed
        offset: false,
      }}
      padding={padding}
    >
      {/* Header content */}
      <AppShell.Header>
        <Flex
          direction={'row'}
          gap={'md'}
          px={'md'}
          py={'xs'}
          align={'center'}
        >
          {/* Logo that links back to the home page */}
          <UnstyledButton
            component={Link}
            href={'/'}
            mr={'auto'}
          >
            <Image
              h={'2.5rem'}
              w={'auto'}
              fit={'contain'}
              src={images.sparkLogoTransparent}
              alt={'Spark Logo'}
            />
          </UnstyledButton>
          <CustomDrawer />
        </Flex>
      </AppShell.Header>

      {/* Wrapper for positioning content in a stack */}
      <div
        style={{
          // Relative positioning to ensure the
          // z-index for child elements works properly
          position: 'relative',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            // Absolute positioning to make the background image cover the full component
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // Ensure the background image stays behind the main content
            zIndex: 0,
            // Fallback background color in case the image fails to load
            backgroundColor: '#000000',
          }}
        >
          <CustomBackgroundImage
            imageSrc={imageSrc}
            height={backgroundHeight}
            bgSize={bgSize}
            pos={pos}
          />
        </div>

        <AppShell.Main
          style={{
            // Relative positioning to ensure the
            // z-index for child elements works properly
            position: 'relative',
            // Ensure the main content is displayed above the background image
            zIndex: 1,
          }}
          // Add padding to the top so that content is not covered by the header
          pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
        >
          {children}
        </AppShell.Main>
      </div>
    </AppShell>
  );
}

export default CustomAppShell;

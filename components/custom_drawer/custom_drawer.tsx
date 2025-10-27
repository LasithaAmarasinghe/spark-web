import {
  Image,
  Burger,
  Button,
  Drawer,
  Flex,
  Divider,
  Text,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { colors } from '@/utils/color_utils';
import { images } from '@/utils/image_utils';
import { useIsMobile } from '@/utils/breakpoint_utils';

function CustomDrawer() {
  const isMobile = useIsMobile();
  // Bool to check the state of the drawer
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <Drawer
        // Check if the drawer is open
        opened={isDrawerOpen}
        // Function to close the drawer
        onClose={closeDrawer}
        // Set drawer to appear on the right side of the screen
        position={'right'}
        // Customize the close button
        closeButtonProps={{ size: 'xl', c: colors.pink1 }}
        // Set background opacity and blur for the overlay
        overlayProps={{ backgroundOpacity: 0.3, blur: 2.4 }}
        title={
          <Image
            h={'2.5rem'}
            w={'auto'}
            fit={'contain'}
            // Spark Logo for the drawer header
            src={images.sparkLogoTransparent}
            alt={'Spark Logo'}
          />
        }
      >
        <Flex
          direction={'column'}
          justify={'flex-start'}
          align={'flex-start'}
          gap={'md'}
        >
          <Divider
            w={'100%'}
            mb={'md'}
          />
          {/* Navigation buttons linking to different routes */}
          <Button
            fullWidth
            component={Link}
            href={'/'}
            radius={'md'}
            size={'md'}
            variant={'subtle'}
            color={'gray'}
            justify={'flex-start'}
          >
            Home
          </Button>
          <Button
            fullWidth
            component={Link}
            href={'/challenge'}
            radius={'md'}
            size={'md'}
            variant={'subtle'}
            color={'gray'}
            justify={'flex-start'}
          >
            Challenge
          </Button>
          <Button
            fullWidth
            component={Link}
            href={'/pi_community'}
            radius={'md'}
            size={'md'}
            variant={'subtle'}
            color={'gray'}
            justify={'flex-start'}
          >
            PI Community
          </Button>
          <Button
            fullWidth
            component={Link}
            href={'/undergraduate'}
            radius={'md'}
            size={'md'}
            variant={'subtle'}
            color={'gray'}
            justify={'flex-start'}
          >
            Undergraduate Development
          </Button>

          <Divider
            style={{
              position: 'absolute',
              bottom: isMobile ? '3rem' : '1.5rem',
            }}
            w={'90%'}
            mb={'md'}
          />
          <Text
            px={'xl'}
            fz={'xs'}
            style={{
              position: 'absolute',
              bottom: isMobile ? '2rem' : '0.5rem',
              right: 0,
              color: 'gray',
            }}
          >
            Designed and Developed by{' '}
            <Anchor
              href={'https://www.linkedin.com/in/yadola/'}
              target={'_blank'}
              // Security measure to prevent tabnabbing
              rel={'noopener noreferrer'}
              fz={'sm'}
              c={colors.pink1 + 'DE'}
              underline={'hover'}
            >
              Aadil
            </Anchor>{' '}
            and{' '}
            <Anchor
              href={'https://www.linkedin.com/in/senuri-de-silva-822187248/'}
              target={'_blank'}
              // Security measure to prevent tabnabbing
              rel={'noopener noreferrer'}
              fz={'sm'}
              c={colors.pink1 + 'DE'}
              underline={'hover'}
            >
              Senuri
            </Anchor>
          </Text>
        </Flex>
      </Drawer>
      <Burger
        lineSize={3}
        color={colors.pink1}
        // Open the drawer when clicked
        onClick={openDrawer}
      />
    </>
  );
}

export default CustomDrawer;

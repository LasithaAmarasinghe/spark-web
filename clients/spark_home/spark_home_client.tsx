'use client';

import { Image, Center, Flex, Text, Box, MantineSize } from '@mantine/core';
import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import ButtonCard from '@/components/button_card/button_card';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { colors } from '@/utils/color_utils';
import { images } from '@/utils/image_utils';
import Transitions from '@/components/transitions_component/transitions';

function SparkHomeClient() {
  const isMobile = useIsMobile();

  // Set padding based on the device size
  const pagePadding: MantineSize = isMobile ? 'sm' : 'md';

  return (
    <CustomAppShell
      backgroundHeight={'100%'}
      imageSrc={images.bg3}
      padding={0}
    >
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={'lg'}
        p={pagePadding}
      >
        {/* Display the Spark logo */}
        <Image
          w={isMobile ? '100%' : '35%'}
          fit={'contain'}
          src={images.sparkLogoTransparent}
          alt={'Spark Logo'}
        />

        <Text
          fz={'h3'}
          fs={'italic'}
          c={colors.pink1}
        >
          Making the Impossible Possible
        </Text>

        <Center
          maw={isMobile ? '100%' : '66%'}
          mb={'md'}
        >
          <Text
            ta={isMobile ? 'left' : 'center'}
            fz={isMobile ? 'h5' : 'h4'}
            fw={500}
            c={'white'}
          >
            SPARK will expose ENTC undergraduates to a set of challenges not
            made available in any other university in Asia, Europe, or the
            Americas. This unique project will not only provide a platform to
            develop and nurture innovative ideas to solve real-world problems,
            but also develop some of the soft and hard skill sets required by
            undergraduates to be effective leaders and consummate professionals
            in the modern-day industry.
          </Text>
        </Center>

        <Flex
          direction={isMobile ? 'column' : 'row'}
          align={'center'}
          justify={'center'}
          wrap={'wrap'}
          gap={isMobile ? 'md' : 'xl'}
        >
          <Transitions
            transition={isMobile ? 'fade-up' : 'fade-down'}
            runOnce={true}
          >
            <ButtonCard
              heading={'SPARK Challenge'}
              description={
                'A Challenge for students to produce unique, novel ' +
                'products and services that mitigate the detrimental ' +
                'impact of Climate Change.'
              }
              imageSrc={images.everestImage}
              width={300}
              height={450}
              bgColor={colors.black1}
              headingColor={colors.blue1}
              href={'/challenge'}
              buttonColor={colors.blue1}
            />
          </Transitions>

          <Transitions runOnce={true}>
            <ButtonCard
              heading={'Pi-Community'}
              description={
                'To build a Community; by exploring the extensive ' +
                'Raspberry Pi resources available at ENTC.'
              }
              imageSrc={images.piImage}
              width={300}
              height={450}
              bgColor={colors.black1}
              headingColor={colors.pink2}
              href={'/pi_community'}
              buttonColor={colors.pink2}
            />
          </Transitions>

          <Transitions
            transition={isMobile ? 'fade-up' : 'fade-down'}
            runOnce={true}
          >
            <ButtonCard
              heading={'Undergraduate Development'}
              description={
                'Being a participant of this program undergraduates ' +
                'will develop important "life skills" required in the ' +
                'modern-day workplace.'
              }
              imageSrc={images.studentsHomepage}
              width={300}
              height={450}
              bgColor={colors.black1}
              headingColor={colors.purple2}
              href={'/undergraduate'}
              buttonColor={colors.purple2}
            />
          </Transitions>
        </Flex>
      </Flex>
    </CustomAppShell>
  );
}

export default SparkHomeClient;

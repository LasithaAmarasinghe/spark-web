'use client';

import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import CommunitySection from '@/components/community_section/community_section';
import { CommunitySectionModel } from '@/models/community/community_section_model';
import { useIsMobile } from '@/utils/breakpoint_utils';
import React from 'react';
import {
  Center,
  Image,
  Flex,
  Text,
  Box,
  MantineSize,
  Divider,
} from '@mantine/core';
import { oswald } from '@/utils/font_utils';
import { colors } from '@/utils/color_utils';
import Transitions from '@/components/transitions_component/transitions';
import { images } from '@/utils/image_utils';
import InfoCard from '@/components/info_card/info_card';

interface PiCommunityClientProps {
  piMoraData: CommunitySectionModel;
  techDemoData: CommunitySectionModel;
  finalYearData: CommunitySectionModel;
}

function PiCommunityClient({
  piMoraData,
  techDemoData,
  finalYearData,
}: PiCommunityClientProps) {
  const isMobile = useIsMobile();

  // Set padding and width based on device size
  const pagePadding: MantineSize = isMobile ? 'sm' : 'md';
  const pageWidth = isMobile ? '100%' : '70%';

  return (
    <CustomAppShell
      backgroundHeight={'200rem'}
      imageSrc={images.bg1}
      bgSize={'cover'}
      pos={'top center'}
    >
      <Flex
        direction={'column'}
        justify={'flex-start'}
        align={'center'}
        gap={'md'}
      >
        <Text
          w={pageWidth}
          fz={'h1'}
          fw={900}
          c={colors.pink2}
          px={pagePadding}
          className={oswald.className}
        >
          SPARK PI COMMUNITY
        </Text>

        <Flex
          w={pageWidth}
          direction={isMobile ? 'column' : 'row'}
          justify={isMobile ? 'start' : 'space-between'}
          align={'center'}
          gap={'xl'}
          px={pagePadding}
        >
          <Text w={pageWidth}>
            In making Raspberry Pis available within the department year on
            year; SPARK will encourage, facilitate and nurture innovation in the
            use of this technology. ENTC intends to build expertise over several
            years to fully support a vibrant and active Pi community and
            therefore become a contributor to the development of products and
            services associated with the Raspberry Pi; in time being recognised
            as a centre of excellence in the use of this device.
          </Text>

          <Box w={isMobile ? '30%' : '10%'}>
            <Image
              src={images.piLogo}
              alt={'pi logo'}
              style={{
                height: '10rem',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          </Box>
        </Flex>

        <Flex
          w={'100%'}
          direction={'column'}
          justify={'center'}
          align={'center'}
          gap={'xl'}
        >
          <CommunitySection
            width={pageWidth}
            height={'auto'}
            bgColor={colors.darkGrey}
            radius={'lg'}
            heading={piMoraData.title}
            headingColor={colors.pink2}
            sectionColor={colors.pink2}
            text={piMoraData.description}
            tabs={piMoraData.tabs}
          />
          <CommunitySection
            width={pageWidth}
            height={'auto'}
            bgColor={colors.darkGrey}
            radius={'lg'}
            heading={techDemoData.title}
            headingColor={colors.pink2}
            sectionColor={colors.pink2}
            text={techDemoData.description}
            tabs={techDemoData.tabs}
          />
          <CommunitySection
            width={pageWidth}
            height={'auto'}
            bgColor={colors.darkGrey}
            radius={'lg'}
            heading={finalYearData.title}
            headingColor={colors.pink2}
            sectionColor={colors.pink2}
            text={finalYearData.description}
            tabs={finalYearData.tabs}
          />
          <Divider
            w={pageWidth}
            my={'sm'}
          />
          <Box
            w={pageWidth}
            h={'auto'}
            pb={'xl'}
          >
            <Transitions>
              <Center>
                <InfoCard
                  width={pageWidth}
                  bgColor={colors.darkGrey}
                  heading={'PI Community Facebook Page'}
                  headingColor={colors.pink2}
                  description={
                    'Pi Community Facebook page informs all followers about all Raspberry Pi related activities at ENTC as well as news about the Raspberry Pi organisation.'
                  }
                  href={
                    'https://www.facebook.com/groups/raspberrypicommunitylk'
                  }
                  imageSrc={images.fbLogoBlue}
                  altText={'Fb logo'}
                  text={'The Facebook group can be found here'}
                  buttonColor={colors.pink2}
                  buttonTextColor={colors.black1}
                />
              </Center>
            </Transitions>
          </Box>
        </Flex>
      </Flex>
    </CustomAppShell>
  );
}

export default PiCommunityClient;

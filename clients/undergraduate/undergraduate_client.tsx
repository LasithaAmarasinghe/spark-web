'use client';

import {
  MantineSize,
  Image,
  List,
  Paper,
  Flex,
  Text,
  Space,
  Box,
} from '@mantine/core';
import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { oswald } from '@/utils/font_utils';
import { colors } from '@/utils/color_utils';
import { images } from '@/utils/image_utils';

function UndergraduateClient() {
  const isMobile = useIsMobile();
  // Set padding and width based on the device size
  const pagePadding: MantineSize = isMobile ? 'sm' : 'md';
  const pageWidth = isMobile ? '100%' : '70%';

  return (
    <CustomAppShell
      backgroundHeight={'auto'}
      imageSrc={images.bg2}
      pos={isMobile ? 'top left' : 'top center'}
    >
      <Flex
        direction={'column'}
        justify={'flex-start'}
        align={'center'}
        gap={'md'}
      >
        <Text
          px={pagePadding}
          w={pageWidth}
          fz={'h1'}
          fw={900}
          c={colors.purple2}
          className={oswald.className}
        >
          UNDERGRADUATE DEVELOPMENT
        </Text>

        <Text
          w={pageWidth}
          px={pagePadding}
        >
          Students may excel academically; however, they will also need to
          practice effective &quot;life skills&quot; whilst in employment to
          become valued members in an organisation. Being able to discuss these
          during recruitment is crucial in demonstrating how they can add real
          value to an organisation.
        </Text>

        <Text
          w={pageWidth}
          px={pagePadding}
        >
          &quot;Between now and 2027, 60% of workers will need retraining due to
          global transformation and macrotrends.&quot; That&apos;s one of many
          findings in the World Economic Forum&apos;s (WEF) 2023 Future of Jobs
          Report.
        </Text>

        <Space h={'sm'} />

        <Paper
          w={pageWidth}
          h={'auto'}
          bg={colors.darkGrey + '80'}
          radius={isMobile ? '' : 'lg'}
          px={isMobile ? 'md' : 'xl'}
          py={'xl'}
        >
          <Text>
            The report identifies the following top 10 &quot;life skills&quot;
            required by employees in 2023.
          </Text>
          <Space h={'xl'} />

          <Flex
            direction={isMobile ? 'column' : 'row'}
            justify={'center'}
            gap={isMobile ? '0' : '6rem'}
          >
            <List type={'ordered'}>
              <List.Item>1. Analytical thinking</List.Item>
              <List.Item>2. Creative thinking</List.Item>
              <List.Item>3. Resilience, flexibility and agility</List.Item>
              <List.Item>4. Motivation and self-awareness</List.Item>
              <List.Item>5. Curiosity and lifelong learning</List.Item>
            </List>

            <List type={'ordered'}>
              <List.Item>6. Technological literacy</List.Item>
              <List.Item>7. Dependability and attention to detail</List.Item>
              <List.Item>8. Empathy and active listening</List.Item>
              <List.Item>9. Leadership and social influence</List.Item>
              <List.Item>10. Quality control</List.Item>
            </List>
          </Flex>

          <Space h={60} />

          <Text
            fw={800}
            fz={'h3'}
          >
            @ ENTC
          </Text>
          <Space h={'lg'} />

          <Box w={isMobile ? '85%' : '90%'}>
            <List listStyleType={'square'}>
              <List.Item>
                The skills identified in the above WEF report will not be
                actively developed by the SPARK programme, but it is expected
                that some of these qualities will develop naturally.
              </List.Item>
              <Space h={'lg'} />
              <List.Item>
                Development of these skills will allow a better
                &quot;class&quot; of undergraduates to enter the employment
                market.
                <Text py={'lg'}>The students will manage: </Text>
                <List listStyleType={'disc'}>
                  <List.Item>
                    In developing solutions for the SPARK Challenge: Teams,
                    resources, ideas and timescales.
                  </List.Item>
                  <List.Item>
                    Programme events: scheduling, content creation and
                    associated marketing.
                  </List.Item>
                  <List.Item>Facebook pages: posts and contents.</List.Item>
                  <List.Item>
                    Raspberry JAMs: scheduling, broadcasts, contents and
                    speakers.
                  </List.Item>
                  <List.Item>Web Site: design and contents.</List.Item>
                </List>
              </List.Item>
            </List>
          </Box>

          <Space h={'xl'} />

          <Image
            w={isMobile ? '100%' : '70%'}
            m={'auto'}
            fit={'contain'}
            src={images.studentsImage}
            alt={'Students'}
            radius={'xl'}
          />
        </Paper>
      </Flex>
    </CustomAppShell>
  );
}

export default UndergraduateClient;

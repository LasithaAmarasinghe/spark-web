'use client';

import CarouselTab from '@/components/carousel_tab/carousel_tab';
import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import InfoCard from '@/components/info_card/info_card';
import ScrollableSegmentedControl from '@/components/scrollable_segmented_control/scrollable_segmented_control';
import Transitions from '@/components/transitions_component/transitions';
import { ChallengeTabsModel } from '@/models/challenge/challenge_tabs_model';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { colors } from '@/utils/color_utils';
import { oswald } from '@/utils/font_utils';
import { images } from '@/utils/image_utils';
import {
  Divider,
  Flex,
  List,
  ListItem,
  Paper,
  Space,
  Text,
  MantineSize,
  Box,
} from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player/lazy';

interface ChallengeClientProps {
  challengeTabs: ChallengeTabsModel;
}

function ChallengeClient({ challengeTabs }: ChallengeClientProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  // Set page padding & width based on device size
  const pagePadding: MantineSize = isMobile ? 'sm' : 'md';
  const pageWidth = isMobile ? '100%' : '70%';

  // Track selected challenge and runner-up
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [selectedRunnerUp, setSelectedRunnerUp] = useState(0);

  return (
    <CustomAppShell
      backgroundHeight={'180rem'}
      imageSrc={images.bg4}
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
          px={pagePadding}
          w={pageWidth}
          fz={'h1'}
          fw={900}
          c={colors.blue1}
          className={oswald.className}
        >
          SPARK CHALLENGE
        </Text>
        <Flex
          w={pageWidth}
          direction={isMobile ? 'column' : 'row'}
          align={isMobile ? 'center' : 'flex-start'}
          gap={'xl'}
          px={pagePadding}
        >
          <Text c={'white'}>
            The SPARK Challenge will reward groups of students that create
            unique, innovative, sustainable and socially/environmentally aware
            solutions; the results potentially having significant positive
            transformative impact on society, industry and the wider
            environment. The project will endeavour to nurture, drive and
            sustain innovation and originality by the introduction of Raspberry
            Pi into ENTC; creating an environment that allows for play, teamwork
            and experimentation.
          </Text>

          <ReactPlayer
            url={'https://youtu.be/DJZw7-Z1EQs'}
            loop={true}
            playing={true}
            muted={true}
            controls={true}
            width={isMobile ? 340 : 1600}
          />
        </Flex>
        <Transitions width={'100%'}>
          <Paper
            w={pageWidth}
            h={'auto'}
            bg={colors.darkGrey + '75'}
            radius={'lg'}
            px={'xl'}
            py={isMobile ? 'md' : 'xl'}
          >
            <Text
              fz={'h3'}
              fw={700}
            >
              Main features of the SPARK challenge:
            </Text>
            <Space h={'xl'} />
            <List
              w={'100%'}
              listStyleType={'disc'}
              withPadding
            >
              <ListItem>
                The challenge is expected to run in each academic year with
                teams&apos; under-graduates working together to deliver
                solutions.
              </ListItem>
              <ListItem>
                External industrial and commercial specialists will evaluate the
                proposals in a “Shark Tank/Dragons Den” environment.
              </ListItem>
              <ListItem>
                The most innovative and progressive solutions will be
                recognised, cele-brated and applauded as the culmination of the
                SPARK Challenge.
              </ListItem>
            </List>
          </Paper>
        </Transitions>
        {/* TODO - Fix and Make it Transition after first one on delay */}
        <Transitions
          width={'100%'}
          // delay={8000}
          // duration={2000}
        >
          <Paper
            w={pageWidth}
            h={'auto'}
            bg={colors.darkGrey + '75'}
            radius={'lg'}
            px={isMobile ? 'md' : 'xl'}
            py={isMobile ? 'md' : 'xl'}
          >
            <Text
              fz={'h3'}
              fw={700}
            >
              Several supporting activities will be undertaken for a successful
              outcome for the Challenge:
            </Text>

            <Space h={'xl'} />

            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify={'center'}
              align={isMobile ? 'center' : 'flex-start'}
              gap={'xl'}
              ml={'auto'}
            >
              <List
                w={isMobile ? '100%' : '100%'}
                listStyleType={'disc'}
                withPadding
              >
                <ListItem>
                  A team of undergraduates from ENTC will manage the delivery of
                  the SPARK programme.
                </ListItem>
                <ListItem>
                  A marketing campaign will be undertaken to raise awareness and
                  seeking long-term form within ENTC.
                </ListItem>
                <ListItem>
                  Workshops on the subject of “Design Led Innovation” will be
                  delivered in support of students developing Challenge
                  solution.
                </ListItem>
                <ListItem>
                  A series of lectures on United Nations - Sustainable
                  Development Goals (SDG&apos;s) will be available to all
                  students.
                </ListItem>
              </List>

              <ReactPlayer
                url={'https://youtu.be/vc8-7VncIbA'}
                loop={true}
                playing={true}
                muted={true}
                controls={true}
                width={isMobile ? 320 : 640}
              />
            </Flex>
          </Paper>
        </Transitions>
        <Space h={'sm'} />
        <Transitions width={'100%'}>
          <Flex
            justify={'flex-start'}
            align={'center'}
            w={pageWidth}
          >
            <ScrollableSegmentedControl
              segmentBgColor={colors.darkGrey + '75'}
              offsetScrollbars={false}
              segmentData={[
                ...challengeTabs.tabs.map((tab, index) => ({
                  label: tab.name.toString(),
                  value: index.toString(),
                })),
                {
                  label: 'Leaderboard',
                  value: 'leaderboard',
                },
              ]}
              onChange={(value) => {
                if (value === 'leaderboard') {
                  router.push('/challenge/leaderboard');
                  return;
                }

                // Reset runner-up selection when changing challenges
                setSelectedRunnerUp(0);
                setSelectedChallenge(Number(value));
              }}
              segmentFgColor={colors.blue1}
            />
          </Flex>
          <Paper
            w={pageWidth}
            h={'auto'}
            bg={colors.darkGrey + '75'}
            style={{
              borderRadius: '1.5rem',
              borderTopLeftRadius: '0',
              borderTopRightRadius: isMobile ? '0' : '1.5rem',
            }}
            px={isMobile ? 'sm' : 'xl'}
            py={isMobile ? 'md' : 'xl'}
          >
            <Text
              fz={isMobile ? 'h2' : 'h1'}
              mb={'md'}
            >
              {challengeTabs.tabs[selectedChallenge].name}
            </Text>
            <Text
              fz={isMobile ? 'h5' : 'h4'}
              mb={'lg'}
            >
              {challengeTabs.tabs[selectedChallenge].description}
            </Text>

            {/* Carousel displaying the winner's team */}
            <CarouselTab
              events={[challengeTabs.tabs[selectedChallenge]?.winnerTeam]}
              headingColor={colors.blue1}
              isWinner={true}
            />
            <Divider my={'lg'} />
            {challengeTabs.tabs[selectedChallenge].runnerUpTeams && (
              <>
                <ScrollableSegmentedControl
                  offsetScrollbars={false}
                  segmentFgColor={colors.blue1}
                  segmentData={challengeTabs.tabs[
                    selectedChallenge
                  ].runnerUpTeams
                    .slice(0, 2) // Set limit to 2
                    .map((tab, index) => ({
                      // Directly use the index to generate the label
                      label: `Runner Up ${index + 1}`,
                      value: index.toString(),
                    }))}
                  onChange={(value) => {
                    // Update the selected runner-up
                    setSelectedRunnerUp(Number(value));
                  }}
                  value={selectedRunnerUp.toString()}
                />
                <CarouselTab
                  events={challengeTabs.tabs[
                    selectedChallenge
                  ]?.runnerUpTeams.slice(0, 2)} // Set limit to 2
                  headingColor={colors.blue1}
                  onCarouselChange={(index) => {
                    // Handle carousel change for runner-up selection
                    setSelectedRunnerUp(index);
                  }}
                  eventIndex={selectedRunnerUp}
                />
              </>
            )}
          </Paper>
        </Transitions>
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
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify={'flex-start'}
              align={'center'}
              gap={'xl'}
            >
              <InfoCard
                width={pageWidth}
                bgColor={colors.darkGrey}
                heading={'Spark Challenge Facebook Page'}
                headingColor={colors.blue1}
                description={
                  'Spark at UoM Facebook Page informs all followers ' +
                  'about the latest news and events done by the Spark ' +
                  'branch of the Electronic club.'
                }
                href={'https://www.facebook.com/SparkUoM'}
                imageSrc={images.fbLogoBlue}
                altText={'Fb logo'}
                text={'The Facebook group can be found here'}
                buttonColor={colors.blue1}
                buttonTextColor={colors.black1}
              />
              <InfoCard
                width={pageWidth}
                bgColor={colors.darkGrey}
                heading={'Spark Challenge Youtube Channel'}
                headingColor={colors.blue1}
                description={
                  'The Spark Challenge YouTube channel serves as a ' +
                  'repository for all significant recording of events ' +
                  'undertaken by Spark Branch of the Electronics club.'
                }
                href={'https://www.youtube.com/@sparkuom6590'}
                imageSrc={images.youtubeLogo}
                altText={'Youtube logo'}
                text={'The YouTube channel can be found here'}
                buttonColor={colors.blue1}
                buttonTextColor={colors.black1}
              />
            </Flex>
          </Transitions>
        </Box>
      </Flex>
    </CustomAppShell>
  );
}

export default ChallengeClient;

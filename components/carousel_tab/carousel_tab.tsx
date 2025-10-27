import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, Space, List, Flex, Anchor } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import theme from '@/components/carousel_tab/carousel_tab.module.css';
import ImageModal from '@/components/image_modal/image_modal';
import { TabDetails } from '@/models/tab_details/tab_details';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { colors } from '@/utils/color_utils';
import { getTitleFontSize } from '@/utils/font_utils';
import { getSubUrl } from '@/utils/config_utils';

interface CarouselTabProps {
  width?: number;
  headingColor?: string;
  descriptionColor?: string;
  autoPlayDelay?: number;
  events?: TabDetails[];
  onCarouselChange?: (index: number) => void;
  eventIndex?: number;
  isWinner?: boolean;
}

function CarouselTab({
  events = [],
  headingColor = 'white',
  descriptionColor = '#cacaca',
  autoPlayDelay = 9000,
  onCarouselChange,
  eventIndex,
  isWinner = false,
}: CarouselTabProps) {
  const isMobile = useIsMobile();

  // Autoplay plugin for the carousel
  const autoplay = useRef(Autoplay({ delay: autoPlayDelay }));

  // Maximum character limit for event
  const characterLimit = 850;
  const titleSizeLimit = 50;
  const carouselBorderRadius = 1.5;

  // Truncate Description to Max Character Length
  const truncateDescription = (description: string): string => {
    if (description.length > characterLimit) {
      return description.slice(0, characterLimit) + '...';
    }
    return description;
  };

  // State to track which event is currently active in the carousel
  const [activeEventIndex, setActiveEventIndex] = useState(eventIndex ?? 0);

  // State to map positions of the carousel correctly when the events change
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Callback to handle carousel index change
  const handleCarouselChange = useCallback(
    (index: number) => {
      // Update active event index
      setActiveEventIndex(index);
      // Call onCarouselChange handler if provided
      onCarouselChange?.(index);
    },
    [onCarouselChange],
  );

  // Effect to sync external eventIndex prop with internal state
  useEffect(() => {
    // Update active index based on prop change
    if (eventIndex !== undefined) {
      handleCarouselChange(eventIndex);
    } else {
      // Update Carousel based on last correct position before event changes
      handleCarouselChange(currentTabIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventIndex, handleCarouselChange, events]);

  return (
    <Carousel
      slideSize={'100%'}
      loop
      // Center slides in carousel
      align={'center'}
      // Allow dragging if more than one event
      draggable={events.length > 1}
      // Show controls only on non-mobile devices with multiple events
      withControls={!isMobile && events.length > 1}
      nextControlIcon={'Next'}
      previousControlIcon={'Previous'}
      controlsOffset={'12rem'}
      // Show indicators if there's more than one event
      withIndicators={events.length > 1}
      // Number of slides to scroll at a time
      slidesToScroll={1}
      // Handle slide change event
      onSlideChange={(index) => {
        setCurrentTabIndex(index);
        handleCarouselChange(index);
      }}
      // Set the initial slide based on the external index
      initialSlide={eventIndex}
      classNames={theme}
      style={{
        '--active-color': headingColor,
        '--default-color': colors.pink1,
      }}
      plugins={[autoplay.current]}
      // Stop autoplay on mouse enter
      onMouseEnter={autoplay.current.stop}
      // Reset autoplay on mouse leave
      onMouseLeave={autoplay.current.reset}
    >
      {events.map((event, index) => (
        <Carousel.Slide key={index}>
          <Flex
            p={isMobile ? 'sm' : 'lg'}
            direction={isMobile ? 'column' : 'row'}
            gap={isMobile ? 'md' : ''}
            justify={isMobile ? 'start' : 'center'}
            align={'flex-start'}
            bg={colors.black1 + '60'}
            style={{
              // Scale effect based on active index
              transform:
                activeEventIndex === index || events.length === 1
                  ? 'scale(1)'
                  : `scale(${isMobile ? 0.96 : 0.8})`,
              transition: 'transform 0.3s ease', // Smooth transition for scaling
              // Bring active event to the front
              zIndex: activeEventIndex === index ? 1 : 0,
              width: '100%',
              height: '100%',
              borderRadius: `${carouselBorderRadius}rem`,
              borderTopLeftRadius: '0',
              borderTopRightRadius: isMobile
                ? '0'
                : `${carouselBorderRadius}rem`,
              overflow: 'hidden',
              marginBottom: '2rem',
            }}
          >
            <Flex
              direction={'column'}
              justify={'center'}
              align={'flex-start'}
              px={isMobile ? '' : 'md'}
              w={isMobile ? '100%' : '90%'}
            >
              <Flex
                w={'100%'}
                direction={'column'}
                align={'center'}
              >
                {/* Display winner badge if applicable */}
                {isWinner && (
                  //  Vector icon for winner badge
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='80'
                    height='80'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke={colors.gold}
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path
                      stroke='none'
                      d='M0 0h24v24H0z' // Clear path to prevent fill
                      fill='none'
                    />
                    {/* Winner icon Svg Path */}
                    <path d='M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z' />
                  </svg>
                )}

                {/* Heading */}
                <Text
                  w={'100%'}
                  fz={getTitleFontSize({
                    titleLength: event.name.length,
                    isMobile: isMobile ?? false,
                    titleSizeLimit: titleSizeLimit,
                  })}
                  fw={700}
                  c={headingColor}
                  // Limit Title lines
                  lineClamp={isMobile ? 4 : 2}
                  ta={isWinner ? 'center' : 'left'}
                >
                  {event.name}
                </Text>
              </Flex>

              <Space h={'lg'} />

              {/*Descriptions*/}
              <Text
                // For '\n' to register as a line break in the description
                style={{ whiteSpace: 'pre-line' }}
                fz={isMobile ? 'sm' : 'md'}
                fw={400}
                c={descriptionColor}
              >
                {truncateDescription(event.description)}
              </Text>

              {/* Show members if there any */}
              {event.members?.length > 0 && (
                <>
                  <Space h={'2rem'} />
                  <Text
                    fz={isMobile ? 'md' : 'lg'}
                    fw={700}
                  >
                    Team Members
                  </Text>
                  <List listStyleType={'disc'}>
                    {/* Max 5 members */}
                    {event.members.slice(0, 5).map((member, index) => (
                      <List.Item
                        key={index}
                        fz={isMobile ? 'sm' : 'md'}
                      >
                        {member}
                      </List.Item>
                    ))}
                  </List>
                </>
              )}

              {/* Show links if there any */}
              {event.links?.length > 0 && (
                <>
                  <Space h={'2rem'} />
                  <Text
                    fz={isMobile ? 'md' : 'lg'}
                    fw={700}
                  >
                    Links
                  </Text>
                  <List listStyleType={'disc'}>
                    {/* Max 4 links */}
                    {event.links.slice(0, 4).map((link, index) => (
                      <List.Item
                        key={index}
                        fz={isMobile ? 'sm' : 'md'}
                      >
                        <Anchor
                          target={'_blank'}
                          // Security measure to prevent tabnabbing
                          rel={'noopener noreferrer'}
                          fz={isMobile ? 'sm' : 'md'}
                          fw={500}
                          c={headingColor}
                          underline={'hover'}
                          href={link.url}
                        >
                          {link.name}
                        </Anchor>
                      </List.Item>
                    ))}
                  </List>
                </>
              )}
            </Flex>

            {/* Images */}
            <Flex
              direction={'column'}
              justify={'center'}
              align={'center'}
              gap={'sm'}
              w={'100%'}
              style={{
                height: isMobile ? '20rem' : '38rem',
                overflow: 'hidden',
                borderRadius: `${carouselBorderRadius / 2}rem`,
              }}
            >
              {/* Max of 2 Images for Carousel */}
              {event.images.slice(0, 2).map((image, index) => (
                <ImageModal
                  key={index}
                  src={getSubUrl() + image}
                  alt={`${event.name} | Image: ${index}`}
                  modalRadius={`${carouselBorderRadius}rem`}
                  imageRadius={`${carouselBorderRadius / 2}rem`}
                  imageStyle={{
                    height: event.images.length <= 1 ? '100%' : '50%',
                    // Maintains aspect ratio and crops image
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: `${carouselBorderRadius / 2}rem`,
                  }}
                />
              ))}
            </Flex>
          </Flex>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselTab;

import { Image, Text, Space, List } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import theme from '@/components/carousel_card/carousel_card.module.css';
import { TabDetails } from '@/models/tab_details/tab_details';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { colors } from '@/utils/color_utils';

interface CarouselCardProps {
  width?: number;
  carouselHeight?: string | number;
  slideSize?: string;
  headingColor?: string;
  descriptionColor?: string;
  autoPlayDelay?: number;
  events?: TabDetails[];
  onCarouselChange?: (index: number) => void;
  eventIndex?: number;
}

function CarouselCard({
  events = [],
  carouselHeight = 650,
  slideSize = '100%',
  headingColor = 'white',
  descriptionColor = '#cacaca',
  autoPlayDelay = 10000,
  onCarouselChange,
  eventIndex,
}: CarouselCardProps) {
  const autoplay = useRef(Autoplay({ delay: autoPlayDelay }));
  const isMobile = useIsMobile();
  const characterLimit = 500; // Set your desired character limit

  // Function to truncate string
  const truncateDescription = (description: string): string => {
    if (description.length > characterLimit) {
      return description.slice(0, characterLimit) + '...';
    }
    return description;
  };

  // Events
  const [activeEventIndex, setActiveEventIndex] = useState(eventIndex ?? 0);
  const handleCarouselChange = useCallback(
    (index: number) => {
      setActiveImageIndex(0);
      setActiveEventIndex(index);
      onCarouselChange?.(index);
    },
    [onCarouselChange],
  );

  // Tiny Images
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  useEffect(() => {
    if (eventIndex !== undefined) {
      handleCarouselChange(eventIndex);
    }
  }, [eventIndex, handleCarouselChange]);

  return (
    <Carousel
      height={carouselHeight}
      slideSize={{ base: '100%', sm: '100%', md: slideSize }}
      slideGap={{ base: 0, sm: 'lg' }}
      loop
      align='center'
      draggable={events.length > 1}
      withControls={events.length > 1}
      withIndicators={events.length > 1}
      slidesToScroll={1}
      onSlideChange={handleCarouselChange}
      initialSlide={eventIndex}
      classNames={theme}
      style={{
        '--active-color': headingColor,
        '--default-color': colors.pink1,
      }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {events.map((event, index) => (
        <Carousel.Slide key={index}>
          <div
            style={{
              transform: activeEventIndex === index ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.3s ease',
              zIndex: activeEventIndex === index ? 1 : 0,
              width: '100%',
              height: '100%',
              objectPosition: 'top center',
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, position: 'relative', height: '100%' }}>
              <Image
                src={event.images[activeImageIndex]}
                alt={`${event.name}`}
                fit={'cover'}
                h={'100%'}
                w={'100%'}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                top: isMobile ? '30%' : '0', // Center vertically
                left: isMobile ? '0%' : '60%', // Center horizontally
                right: 0,
                bottom: 0,
                display: 'flex',
                textAlign: 'left', // Center text
                alignItems: 'flex-start',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background
                padding: '20px',
              }}
            >
              <div
                style={{
                  display: 'block',
                  maxHeight: '100%', // Ensure text doesn't push too much
                  overflow: 'auto', // Allow scrolling for overflow
                  width: '100%', // Full width to fill overlay area
                }}
              >
                <Text
                  fz={'h3'}
                  fw={700}
                  c={headingColor}
                >
                  {event.name}
                </Text>

                <Space h={'lg'} />

                <Text
                  fz={'xs'}
                  fw={600}
                  c={descriptionColor}
                >
                  {truncateDescription(event.description)}
                </Text>
                <Space h={'lg'} />
                {event.images.length > 1 && (
                  <div
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    {event.images.slice(0, 2).map((image, index) => (
                      <div
                        key={index}
                        style={{
                          flex: '0 0 auto',
                          border:
                            index === activeImageIndex
                              ? `0.1rem solid ${headingColor}`
                              : '',
                          width: '40%', // Fixed width for each image container
                          height: '100px', // Fixed height for each image container (can be in px or %)
                          position: 'relative', // Allows proper positioning for absolute children if needed
                          overflow: 'hidden', // Ensures cropping of images
                        }}
                      >
                        <Image
                          onClick={() => handleImageClick(index)}
                          src={image}
                          alt={`${event.name} | Image: ${index}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                          }} // Maintains aspect ratio
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Space h={'lg'} />

                {event.members?.length > 0 && (
                  <>
                    <Text fz={'md'}>Team Members</Text>

                    <List listStyleType={'disc'}>
                      {event.members.map((member, index) => (
                        <List.Item
                          key={index}
                          fz={'xs'}
                        >
                          {member}
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </div>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselCard;

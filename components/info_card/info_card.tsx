import { Image, Text, Card, Flex, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { oswald } from '@/utils/font_utils';
import { colors } from '@/utils/color_utils';

interface InfoCardProps {
  width?: string;
  href?: string;
  target?: string;
  heading: string;
  description: string;
  text?: string;
  imageSrc?: string;
  altText?: string;
  radius?: string;
  bgColor?: string;
  textColor?: string;
  headingColor?: string;
  headingWeight?: number;
  descriptionWeight?: number;
  textWeight?: number;
  buttonColor?: string;
  buttonTextColor?: string;
}

function InfoCard({
  width,
  heading,
  description,
  text,
  href = '',
  target = '_blank',
  imageSrc = '',
  altText = '',
  radius = 'md',
  bgColor = colors.black1,
  textColor = '',
  headingColor = 'white',
  headingWeight = 700,
  descriptionWeight = 600,
  textWeight = 500,
  buttonColor = colors.black1,
  buttonTextColor = colors.blue1,
}: InfoCardProps) {
  const isMobile = useIsMobile();

  // State to track whether the card is hovered
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      w={width}
      radius={radius}
      bg={bgColor}
      padding={'xl'}
      component={'a'}
      href={href}
      target={target}
      // Security measure to prevent tabnabbing
      rel={'noopener noreferrer'}
      style={{
        transform:
          // Scale card on hover
          isHovered && !isMobile ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
        // Ensure hovered card is on top
        zIndex: isHovered && !isMobile ? 1 : 'auto',
      }}
      // Set hover state when the mouse enters the card
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      // Reset hover state when the mouse leaves the card
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <Text
        fz={isMobile ? 'h3' : 'h1'}
        fw={headingWeight}
        c={headingColor}
        className={oswald.className}
      >
        {heading}
      </Text>
      <Text
        fz={isMobile ? 'h6' : 'h4'}
        fw={descriptionWeight}
        py={'md'}
      >
        {description}
      </Text>

      <Flex
        h={'100%'}
        justify={'center'}
        align={'center'}
        mt={'auto'}
        gap={'md'}
      >
        <Image
          h={'5rem'}
          src={imageSrc}
          alt={altText}
        />
        <Text
          fz={isMobile ? 'h6' : 'h5'}
          c={textColor}
          fw={textWeight}
        >
          {text}
        </Text>
      </Flex>

      {/* Learn More Button */}
      <Paper
        w={'auto'}
        h={'auto'}
        py={'xs'}
        px={'md'}
        bg={buttonColor}
        radius={'xl'}
        mt={'auto'}
        ml={'auto'}
      >
        <Text
          fw={900}
          fz={'sm'}
          c={buttonTextColor}
        >
          Learn More
        </Text>
      </Paper>
    </Card>
  );
}

export default InfoCard;

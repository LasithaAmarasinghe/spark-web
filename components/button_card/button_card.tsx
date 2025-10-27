import { Image, Text, Card, MantineSize, Button } from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { useIsMobile } from '@/utils/breakpoint_utils';
import { oswald } from '@/utils/font_utils';
import { colors } from '@/utils/color_utils';

interface ButtonCardProps {
  heading: string;
  description: string;
  href?: string;
  imageSrc?: string;
  height?: number;
  width?: number;
  radius?: string;
  bgColor?: string;
  textColor?: string;
  headingColor?: string;
  headingSize?: string;
  headingWeight?: number;
  textSize?: MantineSize;
  buttonColor?: string;
}

function ButtonCard({
  heading,
  description,
  href = '',
  imageSrc = '',
  height,
  width,
  radius = 'md',
  bgColor = colors.black1,
  textColor = '',
  headingColor = 'white',
  headingSize = 'h2',
  headingWeight = 900,
  textSize = 'sm',
  buttonColor = colors.black1,
}: ButtonCardProps) {
  const isMobile = useIsMobile();

  // Set the card height, falling back to 400 if not provided
  const cardHeight = height ?? 200 * 2;

  // State to track whether the card is hovered
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      h={cardHeight}
      w={width}
      bg={bgColor}
      padding={'sm'}
      // Use Next.js Link component for navigation
      component={Link}
      // URL for the card link
      href={href}
      radius={radius}
      // Add a border around the card
      withBorder
      style={{
        // Scale up the card when hovered (on non-mobile devices)
        transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
        // Smooth transition when the card is scaled
        transition: 'transform 0.3s ease',
        // Bring the hovered card to the front (on non-mobile devices)
        zIndex: isHovered && !isMobile ? 1 : 'auto',
      }}
      // Set hover state when the mouse enters the card
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      // Reset hover state when the mouse leaves the card
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <Card.Section>
        {/* Display image if imageSrc is provided */}
        {imageSrc ? (
          <Image
            height={height}
            width={width}
            // URL of the image
            src={imageSrc}
            // Alt text for the image
            alt={'My image'}
            // Ensure the image fits within the bounds of the card
            fit={'contain'}
          />
        ) : null}
      </Card.Section>

      {/* Card heading */}
      <Text
        c={headingColor}
        fw={headingWeight}
        fz={headingSize}
        px={'md'}
        mt={'md'}
        className={oswald.className}
      >
        {heading}
      </Text>

      {/* Card description */}
      <Text
        c={textColor}
        fw={600}
        size={textSize}
        mt={'md'}
        px={'md'}
      >
        {description}
      </Text>

      <Button
        color={buttonColor}
        radius={'xl'}
        // Push the button to the bottom of the card
        mt={'auto'}
        // Align the button to the right of the card
        ml={'auto'}
      >
        <Text
          fw={900}
          fz={'sm'}
          c={colors.black1}
        >
          Learn More
        </Text>
      </Button>
    </Card>
  );
}

export default ButtonCard;

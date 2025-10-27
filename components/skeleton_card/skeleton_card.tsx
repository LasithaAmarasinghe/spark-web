import { Center, Paper } from '@mantine/core';
// import theme from './skeleton_card.module.css';

interface SkeletonCardProps {
  text: string; // The text to display inside the card
  bgColor?: string; // Background color of the card, defaults to 'purple'
  textColor?: string; // Text color, defaults to 'white'
  radius?: string; // Border radius, defaults to 'md'
  width?: number; // Width of the card in pixels
  height?: number; // Height of the card in pixels
  textSize?: string; // Font size of the text, defaults to 'md'
  textWeight?: number; // Font weight of the text, defaults to 500
}

/**
 * SkeletonCard Component
 *
 * This component renders a card with customizable background color, text color, size, and other styles.
 * It uses Mantine's Paper component for the card and Center for centering the text.
 *
 * @param {string} text - The text to display inside the card.
 * @param {string} [bgColor='purple'] - Background color of the card.
 * @param {string} [textColor='white'] - Color of the text inside the card.
 * @param {string} [radius='md'] - Border radius of the card.
 * @param {number} [width] - Width of the card in pixels.
 * @param {number} [height] - Height of the card in pixels.
 * @param {string} [textSize='md'] - Font size of the text.
 * @param {number} [textWeight=500] - Font weight of the text.
 *
 * @example
 * <SkeletonCard text="Loading..."/>
 */
function SkeletonCard({
  text,
  width,
  height,
  bgColor = 'purple',
  textColor = 'white',
  radius = 'md',
  textSize = 'md',
  textWeight = 500,
}: SkeletonCardProps) {
  return (
    <Paper
      // className={`${theme.skeletonCard}`}
      px={'md'}
      py={'sm'}
      h={height}
      w={width}
      radius={radius}
      bg={bgColor}
      c={textColor}
    >
      <Center
        fz={textSize}
        fw={textWeight}
        h={'100%'}
      >
        {text}
      </Center>
    </Paper>
  );
}

export default SkeletonCard;

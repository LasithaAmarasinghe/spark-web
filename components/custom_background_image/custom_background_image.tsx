import { BackgroundImage } from '@mantine/core';
import React from 'react';

interface CustomBackgroundImageProps {
  imageSrc: string; // image URLs
  height: number | string; // Height of each image
  bgSize?: string;
  pos?: string;
}

function CustomBackgroundImage({
  height,
  imageSrc,
  bgSize = 'cover',
  pos = 'top center',
}: CustomBackgroundImageProps) {
  return (
    <div
      // Container for the background image
      style={{
        // Ensure the container covers the entire area
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Set the height of the background container
        height: height,
      }}
    >
      <BackgroundImage
        // URL for the background image
        src={imageSrc}
        style={{
          // Fill the entire height of the container
          height: '100%',
          // Set how the image should scale (cover, contain, etc.)
          backgroundSize: bgSize,
          // Position the background image (e.g., top, center)
          backgroundPosition: pos,
        }}
      />
      <div
        // Overlay with a gradient effect
        style={{
          // Covers the entire container area
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Transparent at the top, fading to black at the bottom
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%)',
          // Ensures the gradient overlay doesn't block
          // interactions with the background image
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default CustomBackgroundImage;

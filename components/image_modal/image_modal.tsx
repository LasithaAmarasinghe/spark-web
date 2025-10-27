import { useIsMobile } from '@/utils/breakpoint_utils';
import { Image, MantineRadius, MantineStyleProp, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface ImageModalProps {
  src: string;
  alt?: string;
  imageStyle?: MantineStyleProp;
  modalRadius?: MantineRadius;
  imageRadius?: MantineRadius;
}

function ImageModal({
  src,
  alt,
  imageStyle,
  modalRadius,
  imageRadius,
}: ImageModalProps) {
  const isMobile = useIsMobile();

  // Bool to check the state of the image modal
  const [isImageModalOpen, { open: openImageModal, close: closeImageModal }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        opened={isImageModalOpen}
        onClose={closeImageModal}
        withCloseButton={false}
        padding={isMobile ? 'xs' : 'sm'}
        // Adjusts the modal to the size of the image
        size={'auto'}
        radius={modalRadius}
        // Set the transition effect
        transitionProps={{ transition: 'pop' }}
        // Set background opacity and blur for the overlay
        overlayProps={{ backgroundOpacity: 0.3, blur: 2.4 }}
        // Keep the image modal centered
        centered
      >
        <Image
          src={src}
          alt={alt}
          radius={imageRadius}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            // Allows for bigger images on desktop
            height: isMobile ? 'auto' : '80vh',
            // Max height and width for the modal
            maxHeight: '80vh',
            maxWidth: isMobile ? '84vw' : '80vw',
          }}
        />
      </Modal>

      {/* Base Image that is Clickable */}
      <Image
        onClick={openImageModal}
        src={src}
        alt={alt}
        // Add cursor pointer to indicate the image is clickable
        style={{
          ...imageStyle,
          cursor: 'pointer',
        }}
      />
    </>
  );
}

export default ImageModal;

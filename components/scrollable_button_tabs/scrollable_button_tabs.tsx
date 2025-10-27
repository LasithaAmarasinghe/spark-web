import { useIsMobile } from '@/utils/breakpoint_utils';
import { Flex, MantineSize, Paper, ScrollArea } from '@mantine/core';

interface ScrollableButtonTabsProps {
  items: string[];
  onTabSelect: (value: number) => void;
  selectedIndex: number;
  scrollbars?: 'x' | 'y' | 'xy';
  scrollType?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';
  scrollSize?: number;
  offsetScrollbars?: boolean | 'x' | 'y';
  tabsWidth?: string | number;
  tabsGap?: number | (string & {}) | MantineSize;
  buttonSize?: MantineSize;
  buttonRadius?: string;
  buttonColor?: string;
  selectorColor?: string;
  textColor?: string;
}

function ScrollableButtonTabs({
  items,
  onTabSelect: onChange,
  selectedIndex,
  scrollbars = 'x',
  scrollType = 'hover',
  offsetScrollbars = true,
  buttonRadius = 'md',
  buttonColor = '#1e1e1e',
  selectorColor = '#1e1e1e',
  textColor,
  scrollSize,
  tabsWidth,
  tabsGap,
  buttonSize,
}: ScrollableButtonTabsProps) {
  const isMobile = useIsMobile();

  // const buttons = items.map((item, index) => (
  //   <Button
  //     key={index}
  //     value={item}
  //     variant={selectedIndex === index ? 'filled' : 'light'}
  //     size={buttonSize ?? isMobile ? 'xs' : 'md'}
  //     radius={buttonRadius}
  //     color={buttonColor}
  //     c={textColor}
  //     onClick={() => onChange(index)}
  //   >
  //     {item}
  //   </Button>
  // ));
  // // Write Variable which does RGBA of the Hex buttonColor with 0.5 Opacity
  // //   const rgbaColor = `${buttonColor}80`; // Assuming buttonColor is in hex format

  // const buttonColor25 = `rgba(
  //   ${parseInt(buttonColor.slice(1, 3), 16)},
  //   ${parseInt(buttonColor.slice(3, 5), 16)},
  //   ${parseInt(buttonColor.slice(5, 7), 16)},
  //   0.25)`;

  // const buttonsV2 = items.map((item, index) => (
  //   <Paper
  //     key={index}
  //     variant={selectedIndex === index ? 'filled' : 'light'}
  //     px={'md'}
  //     h={60}
  //     radius={buttonRadius}
  //     bg={buttonColor25}
  //     c={textColor}
  //     onClick={() => onChange(index)}
  //   >
  //     <Flex
  //       direction={'column'}
  //       align={'center'}
  //       justify={'space-between'}
  //       h={'100%'}
  //       py={'sm'}
  //     >
  //       {item}
  //       {selectedIndex === index && (
  //         <Paper
  //           bg={buttonColor}
  //           w={'30%'}
  //           h={8}
  //           radius={'xl'}
  //         />
  //       )}
  //     </Flex>
  //   </Paper>
  // ));

  const buttonsV3 = items.map((item, index) => (
    <Flex
      component={'button'}
      key={index}
      direction={'column'}
      align={'center'}
      justify={'space-between'}
      gap={'xs'}
      w={'max-content'}
      onClick={() => onChange(index)}
    >
      <Paper
        variant={selectedIndex === index ? 'filled' : 'light'}
        p={'sm'}
        radius={buttonRadius}
        bg={buttonColor}
        c={textColor}
      >
        {item}
      </Paper>
      {selectedIndex === index && (
        <Paper
          bg={selectorColor}
          w={'30%'}
          h={8}
          radius={'xl'}
        />
      )}
    </Flex>
  ));

  return (
    // TODO - Make Scrolling to Selection Smooth and Animated
    <ScrollArea
      scrollbars={scrollbars}
      type={scrollType}
      scrollbarSize={scrollSize ?? isMobile ? 6 : 10}
      offsetScrollbars={offsetScrollbars}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'sm'}
      >
        {/* <Flex
          w={tabsWidth ?? isMobile ? '100%' : 'auto'}
          direction={'row'}
          justify={'center'}
          align={'center'}
          gap={tabsGap ?? isMobile ? 'xs' : 'sm'}
        >
          {buttons}
        </Flex>
        <Flex
          w={tabsWidth ?? isMobile ? '100%' : 'auto'}
          direction={'row'}
          justify={'center'}
          align={'center'}
          gap={tabsGap ?? isMobile ? 'xs' : 'sm'}
        >
          {buttonsV2}
        </Flex> */}
        <Flex
          w={tabsWidth ?? isMobile ? '100%' : 'auto'}
          direction={'row'}
          justify={'center'}
          align={'center'}
          gap={tabsGap ?? isMobile ? 'xs' : 'sm'}
        >
          {buttonsV3}
        </Flex>
      </Flex>
    </ScrollArea>
  );
}

export default ScrollableButtonTabs;

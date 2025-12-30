'use client';

import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import { colors } from '@/utils/color_utils';
import { oswald } from '@/utils/font_utils';
import { images } from '@/utils/image_utils';
import {
  Box,
  Flex,
  Paper,
  Table,
  Text,
  Title,
} from '@mantine/core';

interface TeamScore {
  teamName: string;
  score: number;
}

interface LeaderboardClientProps {
  teamScores: TeamScore[];
}

function LeaderboardClient({ teamScores }: LeaderboardClientProps) {
  const rows = teamScores.map((team, index) => (
    <Table.Tr key={team.teamName}>
      <Table.Td>
        <Text fw={600}>{index + 1}</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{team.teamName}</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={600} c={colors.blue1}>
          {team.score}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <CustomAppShell
      backgroundHeight={900}
      imageSrc={images.bg4}
      bgSize="cover"
      pos="top center"
    >
      <Flex direction="column" align="center" gap="xl">
        <Title
          order={1}
          c={colors.blue1}
          className={oswald.className}
          mt="md"
        >
          SPARK Challenge 25/26 Leaderboard
        </Title>

        <Box w={{ base: '100%', sm: '90%', md: '70%' }} pb="xl">
          <Paper
            radius="lg"
            p="lg"
            bg={colors.darkGrey + 'BF'}
            shadow="xl"
            style={{ border: `1px solid ${colors.blue1}33` }}
          >
            <Text mb="sm" c="white">
              Rankings are based on the latest submitted team scores for the
              SPARK Challenge 25/26 season.
            </Text>

            <Table
              striped
              highlightOnHover
              withRowBorders={false}
              verticalSpacing="sm"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text fw={700}>Rank</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700}>Team</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700}>Score</Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Paper>
        </Box>
      </Flex>
    </CustomAppShell>
  );
}

export default LeaderboardClient;

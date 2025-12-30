'use client';

import React, { useState } from 'react';
import CustomAppShell from '@/components/custom_app_shell/custom_app_shell';
import { colors } from '@/utils/color_utils';
import { oswald } from '@/utils/font_utils';
import { images } from '@/utils/image_utils';
import { useIsMobile } from '@/utils/breakpoint_utils';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Grid,
  Paper,
  Progress,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconSearch } from '@tabler/icons-react';

interface TeamScore {
  teamName: string;
  score: number;
  problemIdentification: number;
  sustainability: number;
  validation: number;
  innovativeness: number;
  userCentricDesign: number;
  productMarketFit: number;
  growthPotential: number;
  attendance: number;
  teamComposition: number;
}

interface LeaderboardClientProps {
  teamScores: TeamScore[];
}

function LeaderboardClient({ teamScores }: LeaderboardClientProps) {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filter teams based on search query
  const filteredTeams = teamScores.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (teamName: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(teamName)) {
      newExpandedRows.delete(teamName);
    } else {
      newExpandedRows.add(teamName);
    }
    setExpandedRows(newExpandedRows);
  };

  // Get color based on score value
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'green';
    if (percentage >= 40) return 'yellow';
    return 'red';
  };

  // Render individual score item with progress bar
  const ScoreItem = ({ label, score, maxScore }: { label: string; score: number; maxScore: number }) => (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text size="sm" c="dimmed" fw={500}>
          {label}
        </Text>
        <Text size="lg" fw={700} c={getScoreColor(score, maxScore)}>
          {score}/{maxScore}
        </Text>
      </Flex>
      <Progress
        value={(score / maxScore) * 100}
        color={getScoreColor(score, maxScore)}
        size="sm"
        radius="xl"
        animated
      />
    </Box>
  );

  const rows = filteredTeams.map((team) => {
    // Calculate actual rank from original list
    const actualRank = teamScores.indexOf(team) + 1;
    const isExpanded = expandedRows.has(team.teamName);

    return (
      <React.Fragment key={team.teamName}>
        <Table.Tr
          onClick={() => toggleRow(team.teamName)}
          style={{
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          <Table.Td>
            {isExpanded ? (
              <IconChevronDown size={isMobile ? 14 : 16} />
            ) : (
              <IconChevronRight size={isMobile ? 14 : 16} />
            )}
          </Table.Td>
          <Table.Td style={{ width: isMobile ? '70px' : '100px' }}>
            <Text fw={600} size={isMobile ? 'sm' : 'md'}>{actualRank}</Text>
          </Table.Td>
          <Table.Td style={{ maxWidth: isMobile ? '150px' : '250px' }}>
            <Text fw={500} size={isMobile ? 'sm' : 'md'}>
              {team.teamName}
            </Text>
          </Table.Td>
          <Table.Td style={{ width: isMobile ? '80px' : '120px' }}>
            <Text fw={700} c={colors.blue1} size={isMobile ? 'md' : 'lg'}>
              {team.score}
            </Text>
          </Table.Td>
        </Table.Tr>
        {isExpanded && (
          <Table.Tr key={`${team.teamName}-details`}>
            <Table.Td colSpan={4} style={{ padding: 0 }}>
              <Collapse in={isExpanded}>
                <Box p="lg" bg={colors.black1 + 'CC'} style={{ borderTop: `2px solid ${colors.blue1}44` }}>
                  <Flex justify="space-between" align="center" mb="lg">
                    <Text fw={700} size="lg" c={colors.blue1}>
                      Score Breakdown
                    </Text>
                    <Text size="sm" c="dimmed">
                      Total: <Text span fw={700} c={colors.blue1} size="xl">{team.score}</Text>
                    </Text>
                  </Flex>
                  <Divider mb="md" color={colors.blue1 + '33'} />
                  <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Problem Identification" 
                        score={team.problemIdentification}
                        maxScore={15}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Sustainability & Climate" 
                        score={team.sustainability}
                        maxScore={15}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Validation" 
                        score={team.validation}
                        maxScore={15}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Innovativeness" 
                        score={team.innovativeness}
                        maxScore={15}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="User-Centric Design" 
                        score={team.userCentricDesign}
                        maxScore={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Product-Market Fit" 
                        score={team.productMarketFit}
                        maxScore={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Growth Potential" 
                        score={team.growthPotential}
                        maxScore={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Attendance" 
                        score={team.attendance}
                        maxScore={5}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                      <ScoreItem 
                        label="Team Composition" 
                        score={team.teamComposition}
                        maxScore={5}
                      />
                    </Grid.Col>
                  </Grid>
                </Box>
              </Collapse>
            </Table.Td>
          </Table.Tr>
        )}
      </React.Fragment>
    );
  });

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
            <Flex direction="column" gap="md">
              <Text c="white">
                Initial round scores are now live! Teams are ranked based on their total scores from various judging criteria.
              </Text>

              <TextInput
                placeholder="Search teams..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.currentTarget.value)
                }
                styles={{
                  input: {
                    backgroundColor: colors.black1 + 'AA',
                    borderColor: colors.blue1 + '55',
                  },
                }}
              />

              <Box
                style={{
                  maxHeight: '600px',
                  overflowY: 'auto',
                  overflowX: isMobile ? 'auto' : 'visible',
                }}
              >
                <Table
                  striped
                  highlightOnHover
                  withRowBorders={false}
                  verticalSpacing="md"
                  stickyHeader
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: isMobile ? '30px' : '100px' }}></Table.Th>
                      <Table.Th style={{ width: isMobile ? '70px' : '100px' }}>
                        <Text fw={700} size={isMobile ? 'sm' : 'md'}>
                          Rank
                        </Text>
                      </Table.Th>
                      <Table.Th style={{ maxWidth: isMobile ? '150px' : '150px' }}>
                        <Text fw={700} size={isMobile ? 'sm' : 'md'}>
                          Team
                        </Text>
                      </Table.Th>
                      <Table.Th style={{ width: isMobile ? '80px' : '250px' }}>
                        <Text fw={700} size={isMobile ? 'sm' : 'md'}>
                          Score
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Box>

              {filteredTeams.length === 0 && (
                <Text ta="center" c="dimmed" py="xl">
                  No teams found matching &quot;{searchQuery}&quot;
                </Text>
              )}

              <Text size="sm" c="dimmed" ta="center" mt="sm">
                Showing {filteredTeams.length} of {teamScores.length} teams
              </Text>
            </Flex>
          </Paper>
        </Box>
      </Flex>
    </CustomAppShell>
  );
}

export default LeaderboardClient;

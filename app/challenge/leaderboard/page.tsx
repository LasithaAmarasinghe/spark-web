import { promises as fs } from 'fs';
import path from 'path';
import LeaderboardClient from '@/clients/challenge/leaderboard_client';

interface TeamScore {
  teamName: string;
  score: number;
}

async function getTeamScores(): Promise<TeamScore[]> {
  const csvPath = path.join(process.cwd(), 'teams_scores.csv');
  const fileContent = await fs.readFile(csvPath, 'utf-8');

  const lines = fileContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Remove header
  const [, ...rows] = lines;

  const teams: TeamScore[] = rows
    .map((row) => {
      const [name, scoreStr] = row.split(',');
      const score = Number(scoreStr);

      if (!name || Number.isNaN(score)) {
        return undefined;
      }

      return {
        teamName: name,
        score,
      } as TeamScore;
    })
    .filter((value): value is TeamScore => Boolean(value));

  // Sort by score descending, then by name ascending for ties
  teams.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.teamName.localeCompare(b.teamName);
  });

  return teams;
}

async function LeaderboardPage() {
  const teamScores = await getTeamScores();

  return <LeaderboardClient teamScores={teamScores} />;
}

export default LeaderboardPage;

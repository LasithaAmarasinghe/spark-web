import { promises as fs } from 'fs';
import path from 'path';
import LeaderboardClient from '@/clients/challenge/leaderboard_client';

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

async function getTeamScores(): Promise<TeamScore[]> {
  const csvPath = path.join(process.cwd(), 'teams_scores_updated.csv');
  const fileContent = await fs.readFile(csvPath, 'utf-8');

  const lines = fileContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Remove header
  const [, ...rows] = lines;

  const teams: TeamScore[] = rows
    .map((row) => {
      const parts = row.split(',');
      if (parts.length < 11) return undefined;

      const [name, scoreStr, probId, sust, valid, innov, userDesign, pmf, growth, attend, teamComp] = parts;
      const score = Number(scoreStr);

      if (!name || Number.isNaN(score)) {
        return undefined;
      }

      return {
        teamName: name,
        score,
        problemIdentification: Number(probId),
        sustainability: Number(sust),
        validation: Number(valid),
        innovativeness: Number(innov),
        userCentricDesign: Number(userDesign),
        productMarketFit: Number(pmf),
        growthPotential: Number(growth),
        attendance: Number(attend),
        teamComposition: Number(teamComp),
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

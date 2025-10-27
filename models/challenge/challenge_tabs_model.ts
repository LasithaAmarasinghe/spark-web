import { TabDetails } from '@/models/tab_details/tab_details';

export interface ChallengeTabsModel {
  tabs: ChallengeTab[];
}

export interface ChallengeTab {
  name: string;
  description: string;
  winnerTeam: TabDetails;
  runnerUpTeams: TabDetails[];
}

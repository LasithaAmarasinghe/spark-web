import ChallengeClient from '@/clients/challenge/challenge_client';
import { ChallengeTabsModel } from '@/models/challenge/challenge_tabs_model';
import { getJsonData } from '@/utils/json_utils';

async function ChallengePage() {
  // Fetch the challenge data
  const challengeData: ChallengeTabsModel =
    await getJsonData<ChallengeTabsModel>({
      page: 'challenge',
      fileName: 'challenge',
    });

  return <ChallengeClient challengeTabs={challengeData} />;
}

export default ChallengePage;

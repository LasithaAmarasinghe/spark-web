import { CommunityTabsModel } from '@/models/community/community_tabs_model';

export interface CommunitySectionModel {
  title: string;
  description: string;
  tabs: CommunityTabsModel[];
}

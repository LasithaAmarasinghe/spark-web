export interface TabDetails {
  name: string;
  description: string;
  images: string[];
  members: string[];
  links: TabLink[];
}

export interface TabLink {
  name: string;
  url: string;
}

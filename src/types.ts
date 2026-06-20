export enum AppScreen {
  Intro = "INTRO",
  Trust = "TRUST",
  Apology = "APOLOGY",
  Memories = "MEMORIES",
  Proposal = "PROPOSAL",
  Birthday = "BIRTHDAY",
  Surprise = "SURPRISE",
  Planner = "PLANNER",
  Final = "FINAL"
}

export interface Memory {
  id: number;
  title: string;
  period: string;
  description: string;
  imagePlaceholder: string;
  romanticDoodle: string; // inline SVG or description
}

export interface MeetingPlan {
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

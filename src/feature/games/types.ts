export const difficulty = [
  "Just press 'W'",
  "Easy",
  "Easy to learn / Hard to master",
  "Significant brain usage",
  "Difficult",
  "Dark Souls",
] as const;

export const graphics = [
  "You forget what reality is",
  "Beautiful",
  "Good",
  "Decent",
  "Bad",
  "Don't look too long at it",
  "MS-DOS",
] as const;

export const grind = [
  "Nothing to grind",
  "Only if u care about leaderboards",
  "Isn't necessary to progress",
  "Average grind level",
  "Too much grind",
  "You'll need a second life",
] as const;

export const gameTime = [
  "Long enough for a cup of coffee",
  "Short",
  "Average",
  "Long",
  "To infinity and beyond",
] as const;

export const audience = ["Kids", "Teens", "Adults", "Grandma"] as const;

export const languages = [
  "English",
  "French",
  "German",
  "Russian",
  "Danish",
  "Dutch",
  "Finnish",
  "Italian",
  "Japanese",
  "Norwegian",
  "Polish",
  "Spanish",
] as const;

export const tag = [
  "Indie",
  "Action",
  "Adventure",
  "Casual",
  "RPG",
  "Simulation",
  "Strategy",
  "Singleplayer",
  "Early Access",
  "Free to Play",
  "2D",
  "3D",
  "Atmospheric",
  "Fantasy",
  "Story Rich",
  "Colorful",
  "Multiplayer",
  "Puzzle",
  "Exploration",
  "Pixel Graphics",
  "Massively Multiplayer",
  "Cute",
  "Sports",
  "Violent",
  "First-Person",
  "Combat",
  "Racing",
  "Action-Adventure",
  "Anime",
  "Arcade",
  "Funny",
  "Sci-fi",
  "Shooter",
  "Relaxing",
  "Horror",
  "Gore",
] as const;

export const platforms = ["VR", "Windows", "Linux", "Mac"] as const;

type Platforms = (typeof platforms)[number];
type Tag = (typeof tag)[number];
type Languages = (typeof languages)[number];
type Audience = (typeof audience)[number];
type GameTime = (typeof gameTime)[number];
type Grind = (typeof grind)[number];
type Graphics = (typeof graphics)[number];
type Difficulty = (typeof difficulty)[number];

export interface GameStructure {
  _id: string;
  name: string;
  platforms: Platforms[];
  difficulty: Difficulty;
  imageUrl: string;
  languages: Languages[];
  graphics: Graphics;
  audience: Audience[];
  grind: Grind;
  gameTime: GameTime;
  tags: Tag[];
}

export type GameStructureWithOutId = Omit<GameStructure, "_id">;

export interface GameStructureApi extends GameStructureWithOutId {
  id: string;
}

export interface GamePartialStructureApi
  extends Partial<GameStructureWithOutId> {
  id: string;
}

export type GameWithOnlyId = Pick<GameStructureApi, "id">;

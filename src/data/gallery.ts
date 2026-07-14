export interface GalleryImage {
  id: string;
  url: string;
  sessionId?: string;
  characters: string[]; // character IDs
  caption: string;
}

export const gallery: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop",
    sessionId: "s1",
    characters: ["kaldor", "brom"],
    caption: "The aftermath of the tavern brawl."
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=1200&auto=format&fit=crop",
    sessionId: "s2",
    characters: ["lyra"],
    caption: "Lyra scouting ahead in the Whispering Woods."
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    sessionId: "s3",
    characters: ["brom", "kaldor", "lyra"],
    caption: "Facing the undead horrors in the crypt."
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
    sessionId: "s4",
    characters: [],
    caption: "The imposing view of the Frostfang Mountains."
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop",
    characters: ["kaldor"],
    caption: "Kaldor's moment of reflection before the battle."
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    characters: ["lyra", "brom"],
    caption: "Discussing tactics by the campfire."
  }
];

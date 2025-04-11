type Dungeon = {
    id: number;
    name: string;
    expansion: Expansion;
    journalId: number;
};

type Expansion = {
    id: number;
    name: string;
    releaseOrder: number;
    shorthand: string;
    color?: string;
};

export { type Dungeon, type Expansion };

const VANILLA: Expansion = {
    id: 1,
    name: "Vanilla",
    releaseOrder: 1,
    shorthand: "vanilla",
    color: "#D4AF37", // Gold, representing the classic and original feel
};

const TBC: Expansion = {
    id: 2,
    name: "The Burning Crusade",
    releaseOrder: 2,
    shorthand: "tbc",
    color: "#228B22", // Forest green, representing Outland's lush and demonic themes
};

const WOTLK: Expansion = {
    id: 3,
    name: "Wrath of the Lich King",
    releaseOrder: 3,
    shorthand: "wotlk",
    color: "#4682B4", // Steel blue, representing the icy and cold Northrend
};

const CATA: Expansion = {
    id: 4,
    name: "Cataclysm",
    releaseOrder: 4,
    shorthand: "cata",
    color: "#FF4500", // Orange-red, representing fire and destruction caused by Deathwing
};

const MOP: Expansion = {
    id: 5,
    name: "Mists of Pandaria",
    releaseOrder: 5,
    shorthand: "mop",
    color: "#32CD32", // Lime green, representing the lush and serene Pandaria
};

const WOD: Expansion = {
    id: 6,
    name: "Warlords of Draenor",
    releaseOrder: 6,
    shorthand: "wod",
    color: "#8B4513", // Saddle brown, representing the rugged and savage Draenor
};

const LEGION: Expansion = {
    id: 7,
    name: "Legion",
    releaseOrder: 7,
    shorthand: "legion",
    color: "#00FF00", // Bright green, representing the fel energy of the Burning Legion
};

const BFA: Expansion = {
    id: 8,
    name: "Battle for Azeroth",
    releaseOrder: 8,
    shorthand: "bfa",
    color: "#1E90FF", // Dodger blue, representing the naval and faction war themes
};

const SL: Expansion = {
    id: 9,
    name: "Shadowlands",
    releaseOrder: 9,
    shorthand: "sl",
    color: "#4B0082", // Indigo, representing the mysterious and otherworldly Shadowlands
};

const DF: Expansion = {
    id: 10,
    name: "Dragonflight",
    releaseOrder: 10,
    shorthand: "df",
    color: "#FF8C00", // Dark orange, representing the fiery and draconic themes
};

const TWW: Expansion = {
    id: 11,
    name: "The War Within",
    releaseOrder: 11,
    shorthand: "tww",
    color: "#800000", // Maroon, representing the deep and internal conflict themes
};

export const expansions = [TWW, DF, SL, BFA, LEGION, WOD, MOP, CATA, WOTLK, TBC, VANILLA] as const;
export type ExpansionName = (typeof expansions)[number]["shorthand"];

export const TWWDungeons: Dungeon[] = [
    {
        id: 1,
        journalId: 5912542,
        name: "Priory of the Sacred Flame",
        expansion: TWW,
    },
    { id: 2, journalId: 5912539, name: "City of Threads", expansion: TWW },
    { id: 3, journalId: 5912545, name: "The Stonevault", expansion: TWW },
    {
        id: 4,
        journalId: 5912543,
        name: "The Dawnbreaker",
        expansion: TWW,
    },
    { id: 5, journalId: 5912538, name: "Cinderbrew Meadery", expansion: TWW },
    { id: 6, journalId: 5912540, name: "Darkflame Cleft", expansion: TWW },
    { id: 7, journalId: 5912544, name: "The Rookery", expansion: TWW },
    { id: 8, journalId: 6422410, name: "Operation: Floodgate", expansion: TWW },
    { id: 9, journalId: 5912537, name: "Ara-Kara, City of Echoes", expansion: TWW },
];

export const DFDungeons: Dungeon[] = [
    {
        id: 10,
        journalId: 5912542,
        name: "DFPriory of the Sacred Flame",
        expansion: DF,
    },
    { id: 11, journalId: 5912539, name: "DFCity of Threads", expansion: DF },
    { id: 12, journalId: 5912545, name: "DFThe Stonevault", expansion: DF },
    {
        id: 13,
        journalId: 5912543,
        name: "DFThe Dawnbreaker",
        expansion: DF,
    },
    { id: 14, journalId: 5912538, name: "DFCinderbrew Meadery", expansion: DF },
    { id: 15, journalId: 5912540, name: "DFDarkflame Cleft", expansion: DF },
    { id: 16, journalId: 5912544, name: "DFThe Rookery", expansion: DF },
    { id: 17, journalId: 6422410, name: "DFOperation: Floodgate", expansion: DF },
    { id: 18, journalId: 5912537, name: "DFAra-Kara, City of Echoes", expansion: DF },
];

export const dungeonsByExpansion: Record<ExpansionName, Dungeon[]> = { tww: TWWDungeons, df: DFDungeons };
export const allDungeons = Object.values(dungeonsByExpansion).flatMap((dungeon) => dungeon);

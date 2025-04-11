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
};

export { type Dungeon, type Expansion };

const TWW: Expansion = {
    id: 1,
    name: "The War Within",
    releaseOrder: 10,
    shorthand: "tww",
};

const DF: Expansion = {
    id: 2,
    name: "Dragonflight",
    releaseOrder: 9,
    shorthand: "df",
};

export const expansions = [TWW, DF];
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

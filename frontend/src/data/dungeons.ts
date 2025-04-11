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
    jounralEntry: string;
};

export { type Dungeon, type Expansion };

const TWW: Expansion = {
    id: 1,
    name: "The War Within",
    releaseOrder: 10,
    jounralEntry: "tww",
};

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

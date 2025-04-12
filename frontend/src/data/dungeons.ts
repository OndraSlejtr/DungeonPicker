type Dungeon = {
    id: number;
    name: string;
    expansion: Expansion;
    journalId: number | string; // Use string to accommodate both number and string types
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

// export const DFDungeons: Dungeon[] = [
//     {
//         id: 10,
//         journalId: 5912542,
//         name: "DFPriory of the Sacred Flame",
//         expansion: DF,
//     },
//     { id: 11, journalId: 5912539, name: "DFCity of Threads", expansion: DF },
//     { id: 12, journalId: 5912545, name: "DFThe Stonevault", expansion: DF },
//     {
//         id: 13,
//         journalId: 5912543,
//         name: "DFThe Dawnbreaker",
//         expansion: DF,
//     },
//     { id: 14, journalId: 5912538, name: "DFCinderbrew Meadery", expansion: DF },
//     { id: 15, journalId: 5912540, name: "DFDarkflame Cleft", expansion: DF },
//     { id: 16, journalId: 5912544, name: "DFThe Rookery", expansion: DF },
//     { id: 17, journalId: 6422410, name: "DFOperation: Floodgate", expansion: DF },
//     { id: 18, journalId: 5912537, name: "DFAra-Kara, City of Echoes", expansion: DF },
// ];

export const CLASSICDungeons: Dungeon[] = [
    { id: 19, journalId: 608234, name: "Blackfathom Deeps", expansion: VANILLA },
    { id: 20, journalId: 608235, name: "Blackrock Depths", expansion: VANILLA },
    { id: 21, journalId: 526404, name: "Deadmines (Classic)", expansion: VANILLA },
    { id: 22, journalId: "608239a", name: "Dire Maul - Capital Gardens", expansion: VANILLA },
    { id: 23, journalId: "608239b", name: "Dire Maul - Gordok Commons", expansion: VANILLA },
    { id: 24, journalId: "608239c", name: "Dire Maul - Warpwood Quarter", expansion: VANILLA },
    { id: 25, journalId: 608241, name: "Gnomeregan", expansion: VANILLA },
    { id: 26, journalId: 608236, name: "Lower Blackrock Spire", expansion: VANILLA },
    { id: 27, journalId: 608248, name: "Maraudon", expansion: VANILLA },
    { id: 28, journalId: 608250, name: "Ragefire Chasm", expansion: VANILLA },
    { id: 29, journalId: 608251, name: "Razorfen Downs", expansion: VANILLA },
    { id: 30, journalId: 608252, name: "Razorfen Kraul", expansion: VANILLA },
    { id: 31, journalId: 643265, name: "Scarlet Halls (Classic)", expansion: VANILLA },
    { id: 32, journalId: 608253, name: "Scarlet Monastery (Classic)", expansion: VANILLA },
    { id: 33, journalId: 608254, name: "Scholomance (Classic)", expansion: VANILLA },
    { id: 34, journalId: 526410, name: "Shadowfang Keep (Classic)", expansion: VANILLA },
    { id: 35, journalId: "608255a", name: "Stratholme - Main Gate", expansion: VANILLA },
    { id: 36, journalId: "608255b", name: "Stratholme - Service Entrance", expansion: VANILLA },
    { id: 37, journalId: 608262, name: "The Stockade (Classic)", expansion: VANILLA },
    { id: 38, journalId: 608256, name: "The Temple of Atal'hakkar", expansion: VANILLA },
    { id: 39, journalId: 608264, name: "Uldaman", expansion: VANILLA },
    { id: 40, journalId: 608313, name: "Wailing Caverns", expansion: VANILLA },
    { id: 41, journalId: 608267, name: "Zul'Farrak", expansion: VANILLA },
];

export const TBCDungeons: Dungeon[] = [
    { id: 42, journalId: "608232a", name: "Auchenai Crypts", expansion: TBC },
    { id: 43, journalId: "608246a", name: "Hellfire Ramparts", expansion: TBC },
    { id: 44, journalId: "608247", name: "Magisters' Terrace", expansion: TBC },
    { id: 45, journalId: "608232b", name: "Mana-Tombs", expansion: TBC },
    { id: 46, journalId: "608237a", name: "Old Hillsbrad Foothills", expansion: TBC },
    { id: 47, journalId: "608232c", name: "Sethekk Halls", expansion: TBC },
    { id: 48, journalId: "608232d", name: "Shadow Labyrinth", expansion: TBC },
    { id: 49, journalId: "608257a", name: "The Alcatraz", expansion: TBC },
    { id: 50, journalId: "608237b", name: "The Black Morass", expansion: TBC },
    { id: 51, journalId: "608246b", name: "The Blood Furnace", expansion: TBC },
    { id: 52, journalId: "608257b", name: "The Botanica", expansion: TBC },
    { id: 53, journalId: "608257c", name: "The Mechanar", expansion: TBC },
    { id: 54, journalId: "608246c", name: "The Shattered Halls", expansion: TBC },
    { id: 55, journalId: "608238a", name: "The Slave Pens", expansion: TBC },
    { id: 56, journalId: "608238b", name: "The Steamvault", expansion: TBC },
    { id: 57, journalId: "608238c", name: "The Underbog", expansion: TBC },
];

export const WOTLKDungeons: Dungeon[] = [
    { id: 58, journalId: "608231", name: "Ahn'kahet: The Old Kingdom", expansion: WOTLK },
    { id: 59, journalId: "608233", name: "Azjol-Nerub", expansion: WOTLK },
    { id: 60, journalId: "608240", name: "Drak'Tharon Keep", expansion: WOTLK },
    { id: 61, journalId: "608242", name: "Gundrak", expansion: WOTLK },
    { id: 62, journalId: "608243", name: "Halls of Lightning", expansion: WOTLK },
    { id: 63, journalId: "608244", name: "Halls of Reflection", expansion: WOTLK },
    { id: 64, journalId: "608245", name: "Halls of Stone", expansion: WOTLK },
    { id: 65, journalId: "608249", name: "Pit of Saron", expansion: WOTLK },
    { id: 66, journalId: "608258", name: "The Culling of Stratholme", expansion: WOTLK },
    { id: 67, journalId: "608259", name: "The Forge of Souls", expansion: WOTLK },
    { id: 68, journalId: "608260", name: "The Nexus", expansion: WOTLK },
    { id: 69, journalId: "608261", name: "The Oculus", expansion: WOTLK },
    { id: 70, journalId: "608312", name: "The Violet Hold", expansion: WOTLK },
    { id: 71, journalId: "608263", name: "Trial of the Champion", expansion: WOTLK },
    { id: 72, journalId: "608265", name: "Utgarde Keep", expansion: WOTLK },
    { id: 73, journalId: "608266", name: "Utgarde Pinnacle", expansion: WOTLK },
];
export const CATADungeons: Dungeon[] = [
    { id: 74, journalId: "526402", name: "Blackrock Caverns", expansion: CATA },
    { id: 75, journalId: "526404", name: "Deadmines", expansion: CATA },
    { id: 76, journalId: "571758", name: "End Time", expansion: CATA },
    { id: 77, journalId: "526406", name: "Grim Batol", expansion: CATA },
    { id: 78, journalId: "526408", name: "Halls of Origination", expansion: CATA },
    { id: 79, journalId: "571759", name: "Hour of Twilight", expansion: CATA },
    { id: 80, journalId: "526409", name: "Lost City of the Tol'vir", expansion: CATA },
    { id: 81, journalId: "526410", name: "Shadowfang Keep", expansion: CATA },
    { id: 82, journalId: "526412", name: "The Stonecore", expansion: CATA },
    { id: 83, journalId: "526414", name: "The Vortex Pinnacle", expansion: CATA },
    { id: 84, journalId: "526413", name: "Throne of the Tides", expansion: CATA },
    { id: 85, journalId: "571760", name: "Well of Eternity", expansion: CATA },
    { id: 86, journalId: "526415", name: "Zul'Aman", expansion: CATA },
    { id: 87, journalId: "526416", name: "Zul'Gurub", expansion: CATA },
];
export const MOPDungeons: Dungeon[] = [
    { id: 88, journalId: "632277", name: "Gate of the Setting Sun", expansion: MOP },
    { id: 89, journalId: "632279", name: "Mogu'shan Palace", expansion: MOP },
    { id: 90, journalId: "643265", name: "Scarlet Halls", expansion: MOP },
    { id: 91, journalId: "608253", name: "Scarlet Monastery", expansion: MOP },
    { id: 92, journalId: "608254", name: "Scholomance", expansion: MOP },
    { id: 93, journalId: "632281", name: "Shado-Pan Monastery", expansion: MOP },
    { id: 94, journalId: "643266", name: "Siege of Niuzao Temple", expansion: MOP },
    { id: 95, journalId: "632282", name: "Stormstout Brewery", expansion: MOP },
    { id: 96, journalId: "632283", name: "Temple of the Jade Serpent", expansion: MOP },
];
export const WODDungeons: Dungeon[] = [
    { id: 97, journalId: "1041982", name: "Auchindoun", expansion: WOD },
    { id: 98, journalId: "1041984", name: "Bloodmaul Slag Mines", expansion: WOD },
    { id: 99, journalId: "1041986", name: "Grimrail Depot", expansion: WOD },
    { id: 100, journalId: "1060546", name: "Iron Docks", expansion: WOD },
    { id: 101, journalId: "1041988", name: "Shadowmoon Burial Grounds", expansion: WOD },
    { id: 102, journalId: "1041989", name: "Skyreach", expansion: WOD },
    { id: 103, journalId: "1060545", name: "The Everbloom", expansion: WOD },
    { id: 104, journalId: "1041990", name: "Upper Blackrock Spire", expansion: WOD },
];
export const LEGIONDungeons: Dungeon[] = [
    { id: 105, journalId: "1498151", name: "Assault on Violet Hold", expansion: LEGION },
    { id: 106, journalId: "1411847", name: "Black Rook Hold", expansion: LEGION },
    { id: 107, journalId: "1616920", name: "Cathedral of Eternal Night", expansion: LEGION },
    { id: 108, journalId: "1498152", name: "Court of Stars", expansion: LEGION },
    { id: 109, journalId: "1411849", name: "Darkheart Thicket", expansion: LEGION },
    { id: 110, journalId: "1498153", name: "Eye of Azshara", expansion: LEGION },
    { id: 111, journalId: "1498154", name: "Halls of Valor", expansion: LEGION },
    { id: 112, journalId: "1411850", name: "Maw of Souls", expansion: LEGION },
    { id: 113, journalId: "1450572", name: "Neltharion's Lair", expansion: LEGION },
    { id: 114, journalId: "1537281a", name: "Return to Karazhan: Lower", expansion: LEGION },
    { id: 115, journalId: "1537281b", name: "Return to Karazhan: Upper", expansion: LEGION },
    { id: 116, journalId: "1718205", name: "Seat of the Triumvirate", expansion: LEGION },
    { id: 117, journalId: "1411851", name: "The Arcway", expansion: LEGION },
    { id: 118, journalId: "1411852", name: "Vault of the Wardens", expansion: LEGION },
];
export const BFADungeons: Dungeon[] = [
    { id: 119, journalId: "1778890", name: "Atal'Dazar", expansion: BFA },
    { id: 120, journalId: "1778891", name: "Freehold", expansion: BFA },
    { id: 121, journalId: "2177723", name: "Kings' Rest", expansion: BFA },
    { id: 122, journalId: "3025327a", name: "Operation: Mechagon Junkyard", expansion: BFA },
    { id: 123, journalId: "3025327b", name: "Operation: Mechagon Workshop", expansion: BFA },
    { id: 124, journalId: "2177725", name: "Shrine of the Storm", expansion: BFA },
    { id: 125, journalId: "2177726", name: "Siege of Boralus", expansion: BFA },
    { id: 126, journalId: "2177727", name: "Temple of Sethraliss", expansion: BFA },
    { id: 127, journalId: "2177728", name: "The MOTHERLODE!!", expansion: BFA },
    { id: 128, journalId: "2177729", name: "The Underrot", expansion: BFA },
    { id: 129, journalId: "2177730", name: "Tol Dagor", expansion: BFA },
    { id: 130, journalId: "2177732", name: "Waycrest Manor", expansion: BFA },
];
export const SLDungeons: Dungeon[] = [
    { id: 131, journalId: "3759925", name: "De Other Side", expansion: SL },
    { id: 132, journalId: "3759918", name: "Halls of Atonement", expansion: SL },
    { id: 133, journalId: "3759919", name: "Mists of Tirna Scithe", expansion: SL },
    { id: 134, journalId: "3759921", name: "Plaguefall", expansion: SL },
    { id: 135, journalId: "3759922", name: "Sanguine Depths", expansion: SL },
    { id: 136, journalId: "3759923", name: "Spires of Ascension", expansion: SL },
    { id: 137, journalId: "4182024a", name: "Tazavesh: Streets of Wonder", expansion: SL },
    { id: 138, journalId: "4182024b", name: "Tazavesh: So'leah's Gambit", expansion: SL },
    { id: 139, journalId: "3759920", name: "The Necrotic Wake", expansion: SL },
    { id: 140, journalId: "3759924", name: "Theater of Pain", expansion: SL },
];
export const DFDungeons: Dungeon[] = [
    { id: 141, journalId: "4742939", name: "Algeth'ar Academy", expansion: DF },
    { id: 142, journalId: "4742933", name: "Brackenhide Hollow", expansion: DF },
    { id: 143, journalId: "4742936", name: "Halls of Infusion", expansion: DF },
    { id: 144, journalId: "4742938", name: "Neltharus", expansion: DF },
    { id: 145, journalId: "4742937", name: "Ruby Life Pools", expansion: DF },
    { id: 146, journalId: "4742932", name: "The Azure Vault", expansion: DF },
    { id: 147, journalId: "4742934", name: "The Nokhud Offensive", expansion: DF },
    { id: 148, journalId: "4742940", name: "Uldaman: Legacy of Tyr", expansion: DF },
    { id: 149, journalId: "5222376a", name: "Dawn of the Infinite: Galakrond's Fall", expansion: DF },
    { id: 150, journalId: "5222376b", name: "Dawn of the Infinite: Murozond's Rise", expansion: DF },
];

export const dungeonsByExpansion: Record<ExpansionName, Dungeon[]> = {
    tww: TWWDungeons,
    df: DFDungeons,
    sl: SLDungeons,
    bfa: BFADungeons,
    legion: LEGIONDungeons,
    wod: WODDungeons,
    mop: MOPDungeons,
    cata: CATADungeons,
    wotlk: WOTLKDungeons,
    tbc: TBCDungeons,
    vanilla: CLASSICDungeons,
};
export const allDungeons = Object.values(dungeonsByExpansion).flatMap((dungeon) => dungeon);

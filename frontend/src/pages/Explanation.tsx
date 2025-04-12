import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import WordCloud from "../components/WordCloud";

// const dungeons = {
//     Classic: [
//         "Ragefire Chasm",
//         "Wailing Caverns",
//         "The Deadmines",
//         "Shadowfang Keep",
//         "Blackfathom Deeps",
//         "The Stockade",
//         "Gnomeregan",
//         "Razorfen Kraul",
//         "Razorfen Downs",
//         "Scarlet Monastery - Graveyard",
//         "Scarlet Monastery - Library",
//         "Scarlet Monastery - Armory",
//         "Scarlet Monastery - Cathedral",
//         "Uldaman",
//         "Zul'Farrak",
//         "Maraudon",
//         "Sunken Temple",
//         "Blackrock Depths",
//         "Lower Blackrock Spire",
//         "Dire Maul - East",
//         "Dire Maul - West",
//         "Dire Maul - North",
//         "Scholomance",
//         "Stratholme",
//     ],
//     "The Burning Crusade": [
//         "Hellfire Ramparts",
//         "The Blood Furnace",
//         "The Shattered Halls",
//         "The Slave Pens",
//         "The Underbog",
//         "The Steamvault",
//         "Mana-Tombs",
//         "Auchenai Crypts",
//         "Sethekk Halls",
//         "Shadow Labyrinth",
//         "The Mechanar",
//         "The Botanica",
//         "The Arcatraz",
//         "Escape from Durnholde Keep",
//         "Opening of the Dark Portal",
//     ],
//     "Wrath of the Lich King": [
//         "Utgarde Keep",
//         "The Nexus",
//         "Azjol-Nerub",
//         "Ahn'kahet: The Old Kingdom",
//         "Drak'Tharon Keep",
//         "Violet Hold",
//         "Gundrak",
//         "Halls of Stone",
//         "Halls of Lightning",
//         "The Oculus",
//         "Utgarde Pinnacle",
//         "Trial of the Champion",
//         "Forge of Souls",
//         "Pit of Saron",
//         "Halls of Reflection",
//     ],
//     Cataclysm: [
//         "Blackrock Caverns",
//         "Throne of the Tides",
//         "The Stonecore",
//         "The Vortex Pinnacle",
//         "Halls of Origination",
//         "Lost City of the Tol'vir",
//         "Grim Batol",
//         "Zul'Aman",
//         "Zul'Gurub",
//         "End Time",
//         "Well of Eternity",
//         "Hour of Twilight",
//     ],
//     "Mists of Pandaria": [
//         "Temple of the Jade Serpent",
//         "Stormstout Brewery",
//         "Shado-Pan Monastery",
//         "Gate of the Setting Sun",
//         "Mogu'shan Palace",
//         "Siege of Niuzao Temple",
//         "Scholomance (revamped)",
//         "Scarlet Halls",
//         "Scarlet Monastery (revamped)",
//     ],
//     "Warlords of Draenor": [
//         "Bloodmaul Slag Mines",
//         "Iron Docks",
//         "Auchindoun",
//         "Skyreach",
//         "The Everbloom",
//         "Grimrail Depot",
//         "Shadowmoon Burial Grounds",
//         "Upper Blackrock Spire (revamped)",
//     ],
//     Legion: [
//         "Eye of Azshara",
//         "Darkheart Thicket",
//         "Neltharion's Lair",
//         "Halls of Valor",
//         "Vault of the Wardens",
//         "Black Rook Hold",
//         "Maw of Souls",
//         "The Arcway",
//         "Court of Stars",
//         "Cathedral of Eternal Night",
//         "Seat of the Triumvirate",
//         "Return to Karazhan",
//     ],
//     "Battle for Azeroth": [
//         "Freehold",
//         "Waycrest Manor",
//         "Tol Dagor",
//         "Shrine of the Storm",
//         "Atal'Dazar",
//         "The Underrot",
//         "King's Rest",
//         "Temple of Sethraliss",
//         "The MOTHERLODE!!",
//         "Siege of Boralus",
//         "Operation: Mechagon",
//     ],
//     Shadowlands: [
//         "The Necrotic Wake",
//         "Spires of Ascension",
//         "Plaguefall",
//         "Mists of Tirna Scithe",
//         "Halls of Atonement",
//         "Theater of Pain",
//         "De Other Side",
//         "Sanguine Depths",
//         "Tazavesh, the Veiled Market",
//     ],
//     Dragonflight: [
//         "Ruby Life Pools",
//         "The Nokhud Offensive",
//         "Brackenhide Hollow",
//         "Halls of Infusion",
//         "Uldaman: Legacy of Tyr",
//         "Neltharus",
//         "The Azure Vault",
//         "Algeth'ar Academy",
//         "Dawn of the Infinite",
//     ],
//     "The War Within": [
//         "The Rookery",
//         "The Stonevault",
//         "Priory of the Sacred Flame",
//         "Ara-Kara, City of Echoes",
//         "Cinderbrew Meadery",
//         "Darkflame Cleft",
//         "The Dawnbreaker",
//         "City of Threads",
//     ],
// };

const Explanation = () => {
    const words = [
        { text: "Halls of <XYZ>", top: 10, left: 20, fontSize: 1.5, opacity: 0.3 },
        { text: "Make everyone suffer 😈", top: 20, left: 60, fontSize: 1.2, opacity: 0.8 },
        { text: "Easy weeklies 😴", top: 65, left: 15, fontSize: 0.8, opacity: 0.6 },
        { text: "Best trinkets possible", top: 75, left: 65, fontSize: 1.8, opacity: 0.175 },
        { text: "Classic only", top: 50, left: 40, fontSize: 2, opacity: 0.8 },
    ];

    // const lines = Object.entries(dungeons).flatMap(([expansion, dungeons]) => {
    //     return {
    //         text: `${dungeons.join(" ")} (${expansion})`,
    //         fontSize: Math.random() * 1.5 + 0.5,
    //         direction: Math.random() > 0.5 ? "left" : "right",
    //         speed: Math.random() * 2 + 1,
    //     };
    // });

    // [
    //     {
    //         text: "Welcome to DungeonPicker! Welcome to DungeonPicker! Welcome to DungeonPicker! Welcome to DungeonPicker!",
    //         fontSize: 2,
    //         direction: "left",
    //         speed: 2,
    //     },
    //     {
    //         text: "Vote for your favorite dungeons! Welcome to DungeonPicker! Welcome to DungeonPicker!",
    //         fontSize: 1.5,
    //         direction: "right",
    //         speed: 1.25,
    //     },
    //     {
    //         text: "Make your ideal M+ lineup! Welcome to DungeonPicker! Welcome to DungeonPicker! Welcome to DungeonPicker!",
    //         fontSize: 1.8,
    //         direction: "left",
    //         speed: 1.5,
    //     },
    // ];

    //TODO: Scrolling gallery of dungeon pictures

    const navigate = useNavigate();

    return (
        <div style={{ padding: "2rem", textAlign: "center", alignSelf: "center" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                What are perfect 8 Mythic+ dungeons for a season?
            </h1>

            {/* WordCloud with responsive width */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px", // Limit the maximum width for larger screens
                    margin: "0 auto", // Center the WordCloud
                }}
            >
                <WordCloud words={words} height="400px" width="100%" />
            </div>

            <Button onClick={() => navigate("/pick")}>Pick you 8 dungeons »</Button>
            <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
                Once submissions close, everyone can vote on best Pick in tournament style bracket.
            </p>
        </div>
    );
};

export default Explanation;

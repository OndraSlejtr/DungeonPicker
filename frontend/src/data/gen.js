const dungs = `EXP:TBC
608232a, Auchenai Crypts
608246a, Hellfire Ramparts
608247, Magisters' Terrace
608232b, Mana-Tombs
608237a, Old Hillsbrad Foothills
608232c, Sethekk Halls
608232d, Shadow Labyrinth
608257a, The Alcatraz
608237b, The Black Morass
608246b, The Blood Furnace
608257b, The Botanica
608257c, The Mechanar
608246c, The Shattered Halls
608238a, The Slave Pens
608238b, The Steamvault
608238c, The Underbog
EXP:WOTLK
608231, Ahn'kahet: The Old Kingdom
608233, Azjol-Nerub
608240, Drak'Tharon Keep
608242, Gundrak
608243, Halls of Lightning
608244, Halls of Reflection
608245, Halls of Stone
608249, Pit of Saron
608258, The Culling of Stratholme
608259, The Forge of Souls
608260, The Nexus
608261, The Oculus
608312, The Violet Hold
608263, Trial of the Champion
608265, Utgarde Keep
608266, Utgarde Pinnacle
EXP:CATA
526402, Blackrock Caverns
526404, Deadmines
571758, End Time
526406, Grim Batol
526408, Halls of Origination
571759, Hour of Twilight
526409, Lost City of the Tol'vir
526410, Shadowfang Keep
526412, The Stonecore
526414, The Vortex Pinnacle
526413, Throne of the Tides
571760, Well of Eternity
526415, Zul'Aman
526416, Zul'Gurub
EXP:MOP
632277, Gate of the Setting Sun
632279, Mogu'shan Palace
643265, Scarlet Halls
608253, Scarlet Monastery
608254, Scholomance
632281, Shado-Pan Monastery
643266, Siege of Niuzao Temple
632282, Stormstout Brewery
632283, Temple of the Jade Serpent
EXP:WOD
1041982, Auchindoun
1041984, Bloodmaul Slag Mines
1041986, Grimrail Depot
1060546, Iron Docks
1041988, Shadowmoon Burial Grounds
1041989, Skyreach
1060545, The Everbloom
1041990, Upper Blackrock Spire
EXP:LEGION
1498151, Assault on Violet Hold
1411847, Black Rook Hold
1616920, Cathedral of Eternal Night
1498152, Court of Stars
1411849, Darkheart Thicket
1498153, Eye of Azshara
1498154, Halls of Valor
1411850, Maw of Souls
1450572, Neltharion's Lair
1537281a, Return to Karazhan: Lower
1537281b, Return to Karazhan: Upper
1718205, Seat of the Triumvirate
1411851, The Arcway
1411852, Vault of the Wardens
EXP:BFA
1778890, Atal'Dazar
1778891, Freehold
2177723, Kings' Rest
3025327a, Operation: Mechagon Junkyard
3025327b, Operation: Mechagon Workshop
2177725, Shrine of the Storm
2177726, Siege of Boralus
2177727, Temple of Sethraliss
2177728, The MOTHERLODE!!
2177729, The Underrot
2177730, Tol Dagor
2177732, Waycrest Manor
EXP:SL
3759925, De Other Side
3759918, Halls of Atonement
3759919, Mists of Tirna Scithe
3759921, Plaguefall
3759922, Sanguine Depths
3759923, Spires of Ascension
4182024a, Tazavesh: Streets of Wonder 
4182024b, Tazavesh: So'leah's Gambit
3759920, The Necrotic Wake
3759924, Theater of Pain
EXP:DF
4742939, Algeth'ar Academy
4742933, Brackenhide Hollow
4742936, Halls of Infusion
4742938, Neltharus
4742937, Ruby Life Pools
4742932, The Azure Vault
4742934, The Nokhud Offensive
4742940, Uldaman: Legacy of Tyr
5222376a, Dawn of the Infinite: Galakrond's Fall
5222376b, Dawn of the Infinite: Murozond's Rise`;

const dungsArray = [];
let exp = "";

let id = 42;

dungs.split("\n").forEach((line) => {
    if (line.startsWith("EXP:")) {
        exp = line.replace("EXP:", "").trim();
    } else {
        const [journalId, name] = line.split(", ").map((item) => item.trim());
        dungsArray.push(`{ id: ${id}, journalId: "${journalId}", name: "${name}", expansion: ${exp} },`);
        id++;
    }
});

console.log(dungsArray.join("\n"));

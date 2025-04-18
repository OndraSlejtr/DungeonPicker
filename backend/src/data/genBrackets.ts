/*
1. Create bracket structure

!!! will need to dedupe lists and split potential winnings
    sort By Id


2. DB structure for sending in votes and current user progress through voting 
    voteValue = 2^roundNumber? just note down votes

    VOTE table:
        round from 0 to XXX
        match from 0 to XXX (max of 32 right now)

        winner - list of dungeonIDs
        loser - list of dungeonIDs

*/

const picks = [
    {
        id: 114,
        created_at: "2025-04-16 20:18:53.374623+00",
        author_discord_id: "3y3scr3am",
        dungeons: [1, 133, 127, 108, 6, 4, 9, 96],
        listType: "best",
    },
    {
        id: 113,
        created_at: "2025-04-16 20:15:32.868209+00",
        author_discord_id: "3y3scr3am",
        dungeons: [150, 3, 2, 148, 144, 69, 131, 135],
        listType: "worst",
    },
    {
        id: 107,
        created_at: "2025-04-15 21:08:55.619078+00",
        author_discord_id: "a1shar",
        dungeons: [141, 134, 133, 108, 67, 128, 119, 120],
        listType: "best",
    },
    {
        id: 108,
        created_at: "2025-04-15 21:10:25.023948+00",
        author_discord_id: "a1shar",
        dungeons: [126, 121, 135, 143, 8, 66, 46, 94],
        listType: "worst",
    },
    {
        id: 101,
        created_at: "2025-04-15 20:42:16.675269+00",
        author_discord_id: "bigboy_gabe",
        dungeons: [112, 133, 132, 120, 141, 138, 108, 116],
        listType: "best",
    },
    {
        id: 70,
        created_at: "2025-04-15 18:39:52.90893+00",
        author_discord_id: "bigboy_gabe",
        dungeons: [2, 142, 135, 126, 129, 107, 102, 124],
        listType: "worst",
    },
    {
        id: 94,
        created_at: "2025-04-15 20:29:58.984319+00",
        author_discord_id: "bugrid",
        dungeons: [112, 119, 108, 133, 138, 132, 141, 9],
        listType: "best",
    },
    {
        id: 96,
        created_at: "2025-04-15 20:32:59.651299+00",
        author_discord_id: "bugrid",
        dungeons: [97, 102, 93, 107, 124, 70, 105, 78],
        listType: "worst",
    },
    {
        id: 72,
        created_at: "2025-04-15 18:41:16.188881+00",
        author_discord_id: "capy_degen",
        dungeons: [9, 141, 133, 120, 119, 122, 138, 132],
        listType: "best",
    },
    {
        id: 79,
        created_at: "2025-04-15 18:44:31.380582+00",
        author_discord_id: "capy_degen",
        dungeons: [136, 3, 145, 2, 114, 131, 135, 7],
        listType: "worst",
    },
    {
        id: 45,
        created_at: "2025-04-15 16:33:55.857857+00",
        author_discord_id: "cukr0",
        dungeons: [112, 120, 119, 67, 133, 6, 9, 108],
        listType: "best",
    },
    {
        id: 51,
        created_at: "2025-04-15 16:38:59.999299+00",
        author_discord_id: "cukr0",
        dungeons: [1, 143, 131, 121, 124, 107, 116, 104],
        listType: "worst",
    },
    {
        id: 127,
        created_at: "2025-04-17 17:11:49.327656+00",
        author_discord_id: "dajos",
        dungeons: [148, 143, 99, 69, 71, 77, 124, 137],
        listType: "worst",
    },
    {
        id: 111,
        created_at: "2025-04-16 05:01:57.272831+00",
        author_discord_id: "daryl__",
        dungeons: [120, 112, 117, 87, 72, 52, 37, 20],
        listType: "best",
    },
    {
        id: 112,
        created_at: "2025-04-16 05:04:45.111247+00",
        author_discord_id: "daryl__",
        dungeons: [2, 145, 140, 124, 130, 106, 99, 46],
        listType: "worst",
    },
    {
        id: 115,
        created_at: "2025-04-17 14:07:42.070445+00",
        author_discord_id: ".dryfish",
        dungeons: [9, 122, 120, 132, 133, 4, 6, 141],
        listType: "best",
    },
    {
        id: 117,
        created_at: "2025-04-17 14:08:57.271558+00",
        author_discord_id: ".dryfish",
        dungeons: [3, 2, 8, 1, 140, 21, 135, 145],
        listType: "worst",
    },
    {
        id: 91,
        created_at: "2025-04-15 20:26:56.6067+00",
        author_discord_id: "erdmoon",
        dungeons: [133, 138, 132, 141, 142, 112, 108, 122],
        listType: "best",
    },
    {
        id: 93,
        created_at: "2025-04-15 20:29:34.403831+00",
        author_discord_id: "erdmoon",
        dungeons: [149, 124, 129, 102, 75, 2, 144, 121],
        listType: "worst",
    },
    {
        id: 118,
        created_at: "2025-04-17 14:11:03.927109+00",
        author_discord_id: "grepylol",
        dungeons: [6, 4, 141, 132, 133, 120, 128, 112],
        listType: "best",
    },
    {
        id: 116,
        created_at: "2025-04-17 14:08:35.264694+00",
        author_discord_id: "grepylol",
        dungeons: [145, 147, 135, 136, 124, 129, 2, 3],
        listType: "worst",
    },
    {
        id: 120,
        created_at: "2025-04-17 15:25:08.604938+00",
        author_discord_id: "gtliadrinea",
        dungeons: [44, 67, 118, 128, 133, 141, 5, 99],
        listType: "best",
    },
    {
        id: 119,
        created_at: "2025-04-17 15:18:57.586982+00",
        author_discord_id: "gtliadrinea",
        dungeons: [48, 69, 87, 104, 116, 124, 135, 146],
        listType: "worst",
    },
    {
        id: 105,
        created_at: "2025-04-15 21:05:25.718922+00",
        author_discord_id: "kooubek",
        dungeons: [120, 122, 138, 108, 132, 146, 9, 133],
        listType: "best",
    },
    {
        id: 104,
        created_at: "2025-04-15 21:04:12.911543+00",
        author_discord_id: "kooubek",
        dungeons: [69, 99, 107, 126, 124, 121, 116, 118],
        listType: "worst",
    },
    {
        id: 121,
        created_at: "2025-04-17 15:53:12.594416+00",
        author_discord_id: "marru01",
        dungeons: [103, 108, 106, 119, 120, 128, 130, 132],
        listType: "best",
    },
    {
        id: 124,
        created_at: "2025-04-17 16:05:11.808793+00",
        author_discord_id: "marru01",
        dungeons: [118, 126, 137, 131, 149, 96, 121, 83],
        listType: "worst",
    },
    {
        id: 109,
        created_at: "2025-04-15 21:10:35.861159+00",
        author_discord_id: "ninah8637",
        dungeons: [141, 132, 138, 120, 112, 107, 116, 114],
        listType: "best",
    },
    {
        id: 110,
        created_at: "2025-04-15 21:13:22.637208+00",
        author_discord_id: "ninah8637",
        dungeons: [148, 149, 131, 121, 129, 105, 94, 8],
        listType: "worst",
    },
    {
        id: 47,
        created_at: "2025-04-15 16:34:49.5538+00",
        author_discord_id: ".omnira",
        dungeons: [141, 132, 133, 135, 121, 127, 112, 109],
        listType: "best",
    },
    {
        id: 46,
        created_at: "2025-04-15 16:34:18.259632+00",
        author_discord_id: ".omnira",
        dungeons: [3, 146, 136, 116, 107, 99, 143, 70],
        listType: "worst",
    },
    {
        id: 98,
        created_at: "2025-04-15 20:35:32.052257+00",
        author_discord_id: ".palec",
        dungeons: [9, 141, 65, 117, 110, 132, 103, 4],
        listType: "best",
    },
    {
        id: 99,
        created_at: "2025-04-15 20:37:30.276423+00",
        author_discord_id: ".palec",
        dungeons: [77, 148, 107, 130, 121, 105, 140, 134],
        listType: "worst",
    },
    {
        id: 86,
        created_at: "2025-04-15 18:53:51.398646+00",
        author_discord_id: "psajcho",
        dungeons: [9, 141, 133, 119, 120, 108, 37, 65],
        listType: "best",
    },
    {
        id: 87,
        created_at: "2025-04-15 18:54:13.964936+00",
        author_discord_id: "psajcho",
        dungeons: [2, 148, 131, 124, 125, 116, 102, 94],
        listType: "worst",
    },
    {
        id: 65,
        created_at: "2025-04-15 18:17:27.603542+00",
        author_discord_id: "quetesh",
        dungeons: [82, 95, 106, 112, 119, 133, 4, 130],
        listType: "best",
    },
    {
        id: 89,
        created_at: "2025-04-15 20:20:49.879299+00",
        author_discord_id: "quetesh",
        dungeons: [2, 8, 148, 125, 111, 75, 69, 20],
        listType: "worst",
    },
    {
        id: 123,
        created_at: "2025-04-17 15:55:21.365656+00",
        author_discord_id: "seean8156",
        dungeons: [138, 133, 120, 119, 108, 101, 126, 112],
        listType: "best",
    },
    {
        id: 122,
        created_at: "2025-04-17 15:53:24.101263+00",
        author_discord_id: "seean8156",
        dungeons: [21, 36, 35, 136, 129, 50, 107, 143],
        listType: "worst",
    },
    {
        id: 61,
        created_at: "2025-04-15 18:11:17.043108+00",
        author_discord_id: "sinkvili",
        dungeons: [6, 141, 131, 133, 130, 120, 111, 83],
        listType: "best",
    },
    {
        id: 62,
        created_at: "2025-04-15 18:12:27.59518+00",
        author_discord_id: "sinkvili",
        dungeons: [145, 128, 115, 99, 82, 68, 52, 25],
        listType: "worst",
    },
    {
        id: 52,
        created_at: "2025-04-15 16:39:40.037056+00",
        author_discord_id: "targriss",
        dungeons: [96, 108, 119, 128, 133, 6, 9, 120],
        listType: "best",
    },
    {
        id: 53,
        created_at: "2025-04-15 16:40:32.400285+00",
        author_discord_id: "targriss",
        dungeons: [2, 150, 135, 121, 106, 116, 94, 3],
        listType: "worst",
    },
    {
        id: 68,
        created_at: "2025-04-15 18:29:01.427371+00",
        author_discord_id: "zeemik",
        dungeons: [132, 133, 138, 119, 122, 141, 6, 108],
        listType: "best",
    },
    {
        id: 126,
        created_at: "2025-04-17 17:11:18.788007+00",
        author_discord_id: "zeemik",
        dungeons: [3, 150, 136, 135, 114, 111, 148, 8],
        listType: "worst",
    },
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const startingBracket = picks
    .filter((pick) => pick.listType === "best")
    .map((pick) => ({ dungeons: pick.dungeons, id: pick.id, authord_discord_id: pick.author_discord_id }));

shuffleArray(startingBracket);

console.log(startingBracket.length);

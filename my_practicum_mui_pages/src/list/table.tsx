const gameData = [
    {
        id: 1,
        title: "Stalker",
        publisher: "GSC Game World",
        developer: "GSC Game World",
        genre: "FPS/RPG",
        releaseYear: 2007,
        sales: 2000000,
        img: "/images/Image_1.jpg"
    },
    {
        id: 2,
        title: "Crisys",
        publisher: "Electronic Arts",
        developer: "Crytek",
        genre: "FPS",
        releaseYear: 2007,
        sales: 3000000,
        img: "/images/Image_2.jpg"
    },
    {
        id: 3,
        title: "StarCraft 2",
        publisher: "Blizzard Entertainment",
        developer: "Blizzard Entertainment",
        genre: "RTS",
        releaseYear: 2010,
        sales: 6000000,
        img: "/images/Image_3.jpg"
    },
    {
        id: 4,
        title: "Assasins Creed",
        publisher: "Ubisoft",
        developer: "Ubisoft Montreal",
        genre: "Action-Adventure",
        releaseYear: 2007,
        sales: 12000000,
        img: "/images/Image_4.jpg"
    },
    {
        id: 5,
        title: "Ghost Recon",
        publisher: "Ubisoft",
        developer: "Ubisoft Paris",
        genre: "Tactical Shooter",
        releaseYear: 2001,
        sales: 5000000,
        img: "/images/Image_5.jpg"
    },
    {
        id: 6,
        title: "Witcher",
        publisher: "CD Projekt",
        developer: "CD Projekt Red",
        genre: "RPG",
        releaseYear: 2007,
        sales: 10000000,
        img: "/images/image_6.jpg"
    },
    {
        id: 7,
        title: "Mortal Kombat",
        publisher: "Warner Bros. Games",
        developer: "NetherRealm Studios",
        genre: "Fighting",
        releaseYear: 1992,
        sales: 50000000,
        img: "/images/Image_7.jpg"
    },
    {
        id: 8,
        title: "Cyberpunk 2077",
        publisher: "CD Projekt",
        developer: "CD Projekt Red",
        genre: "RPG",
        releaseYear: 2020,
        sales: 20000000,
        img: "/images/Image_8.jpg"
    },
    {
        id: 9,
        title: "DOTA 2",
        publisher: "Valve",
        developer: "Valve",
        genre: "MOBA",
        releaseYear: 2013,
        sales: 0, // Бесплатная игра
        img: "/images/Image_10.jpg"
    },
    {
        id: 10,
        title: "Nier: Automata",
        publisher: "Square Enix",
        developer: "PlatinumGames",
        genre: "Action RPG",
        releaseYear: 2017,
        sales: 7000000,
        img: "/images/Image_9.jpg"
    },
    {
        id: 11,
        title: "Pubg",
        publisher: "Krafton",
        developer: "PlayerUnknown's",
        genre: "Action",
        releaseYear: 2018,
        sales: 7000000,
        img: "/images/default.jpg"
    },
    {
        id: 12,
        title: "The Witcher 2",
        publisher: "CD Projekt Red",
        developer: "CD Projekt Red",
        genre: "RPG",
        releaseYear: 2012,
        sales: 12000000,
        img: "/images/default.jpg"
    },
    {
        id: 13,
        title: "The Witcher 3",
        publisher: "CD Projekt Red",
        developer: "CD Projekt Red",
        genre: "RPG",
        releaseYear: 2015,
        sales: 35000000,
        img: "/images/default.jpg"
    },
    {
        id: 14,
        title: "Doom",
        publisher: "Bethesda",
        developer: "ID Software",
        genre: "FPS",
        releaseYear: 2016,
        sales: 1300000,
        img: "/images/default.jpg"
    },
    {
        id: 15,
        title: "Elden Ring",
        publisher: "Bandai Namco",
        developer: "FromSoftware",
        genre: "Souls-like",
        releaseYear: 2022,
        sales: 25000000,
        img: "/images/default.jpg"
    },
    {
        id: 16,
        title: "Grand Theft Auto V",
        publisher: "Rockstar Games",
        developer: "Rockstar North",
        genre: "Action-Adventure",
        releaseYear: 2013,
        sales: 185000000,
        img: "/images/default.jpg"
    },
    {
        id: 17,
        title: "Minecraft",
        publisher: "Mojang",
        developer: "Mojang",
        genre: "Sandbox",
        releaseYear: 2011,
        sales: 240000000,
        img: "/images/default.jpg"
    },
    {
        id: 18,
        title: "The Legend of Zelda: Breath of the Wild",
        publisher: "Nintendo",
        developer: "Nintendo",
        genre: "Action-Adventure",
        releaseYear: 2017,
        sales: 32000000,
        img: "/images/default.jpg"
    },
    {
        id: 19,
        title: "Red Dead Redemption 2",
        publisher: "Rockstar Games",
        developer: "Rockstar Studios",
        genre: "Action-Adventure",
        releaseYear: 2018,
        sales: 55000000,
        img: "/images/default.jpg"
    },
    {
        id: 20,
        title: "Fortnite",
        publisher: "Epic Games",
        developer: "Epic Games",
        genre: "Battle Royale",
        releaseYear: 2017,
        sales: 350000000,
        img: "/images/default.jpg"
    },
    {
        id: 21,
        title: "League of Legends",
        publisher: "Riot Games",
        developer: "Riot Games",
        genre: "MOBA",
        releaseYear: 2009,
        sales: 115000000,
        img: "/images/default.jpg"
    },
    {
        id: 22,
        title: "World of Warcraft",
        publisher: "Blizzard Entertainment",
        developer: "Blizzard Entertainment",
        genre: "MMORPG",
        releaseYear: 2004,
        sales: 120000000,
        img: "/images/default.jpg"
    },
    {
        id: 23,
        title: "Among Us",
        publisher: "Innersloth",
        developer: "Innersloth",
        genre: "Party",
        releaseYear: 2018,
        sales: 500000000,
        img: "/images/default.jpg"
    },
    {
        id: 24,
        title: "Genshin Impact",
        publisher: "miHoYo",
        developer: "miHoYo",
        genre: "Action RPG",
        releaseYear: 2020,
        sales: 70000000,
        img: "/images/default.jpg"
    },
    {
        id: 25,
        title: "Apex Legends",
        publisher: "Electronic Arts",
        developer: "Respawn Entertainment",
        genre: "Battle Royale",
        releaseYear: 2019,
        sales: 100000000,
        img: "/images/default.jpg"
    },
    {
        id: 26,
        title: "God of War",
        publisher: "Sony Interactive Entertainment",
        developer: "SIE Santa Monica Studio",
        genre: "Action-Adventure",
        releaseYear: 2018,
        sales: 23000000,
        img: "/images/default.jpg"
    },
    {
        id: 27,
        title: "Super Mario Odyssey",
        publisher: "Nintendo",
        developer: "Nintendo",
        genre: "Platformer",
        releaseYear: 2017,
        sales: 25000000,
        img: "/images/default.jpg"
    },
    {
        id: 28,
        title: "Call of Duty: Modern Warfare",
        publisher: "Activision",
        developer: "Infinity Ward",
        genre: "FPS",
        releaseYear: 2019,
        sales: 30000000,
        img: "/images/default.jpg"
    },
    {
        id: 29,
        title: "FIFA 21",
        publisher: "EA Sports",
        developer: "EA Vancouver",
        genre: "Sports",
        releaseYear: 2020,
        sales: 31000000,
        img: "/images/default.jpg"
    },
    {
        id: 30,
        title: "Animal Crossing: New Horizons",
        publisher: "Nintendo",
        developer: "Nintendo",
        genre: "Life Simulation",
        releaseYear: 2020,
        sales: 42000000,
        img: "/images/default.jpg"
    },
    {
        id: 31,
        title: "The Elder Scrolls V: Skyrim",
        publisher: "Bethesda",
        developer: "Bethesda Game Studios",
        genre: "RPG",
        releaseYear: 2011,
        sales: 30000000,
        img: "/images/default.jpg"
    },
    {
        id: 32,
        title: "The Sims 4",
        publisher: "Electronic Arts",
        developer: "Maxis",
        genre: "Life Simulation",
        releaseYear: 2014,
        sales: 40000000,
        img: "/images/default.jpg"
    },
    {
        id: 33,
        title: "Overwatch",
        publisher: "Blizzard Entertainment",
        developer: "Blizzard Entertainment",
        genre: "FPS",
        releaseYear: 2016,
        sales: 50000000,
        img: "/images/default.jpg"
    },
    {
        id: 34,
        title: "Valorant",
        publisher: "Riot Games",
        developer: "Riot Games",
        genre: "FPS",
        releaseYear: 2020,
        sales: 14000000,
        img: "/images/default.jpg"
    },
    {
        id: 35,
        title: "Pokémon Sword and Shield",
        publisher: "Nintendo",
        developer: "Game Freak",
        genre: "RPG",
        releaseYear: 2019,
        sales: 26000000,
        img: "/images/default.jpg"
    },
    {
        id: 36,
        title: "Horizon Zero Dawn",
        publisher: "Sony Interactive Entertainment",
        developer: "Guerrilla Games",
        genre: "Action RPG",
        releaseYear: 2017,
        sales: 20000000,
        img: "/images/default.jpg"
    },
    {
        id: 37,
        title: "Ghost of Tsushima",
        publisher: "Sony Interactive Entertainment",
        developer: "Sucker Punch Productions",
        genre: "Action-Adventure",
        releaseYear: 2020,
        sales: 9000000,
        img: "/images/default.jpg"
    },
    {
        id: 38,
        title: "Doom Eternal",
        publisher: "Bethesda",
        developer: "id Software",
        genre: "FPS",
        releaseYear: 2020,
        sales: 5000000,
        img: "/images/default.jpg"
    },
    {
        id: 39,
        title: "The Last of Us Part II",
        publisher: "Sony Interactive Entertainment",
        developer: "Naughty Dog",
        genre: "Action-Adventure",
        releaseYear: 2020,
        sales: 10000000,
        img: "/images/default.jpg"
    },
    {
        id: 40,
        title: "The Last of Us",
        publisher: "Sony Interactive Entertainment",
        developer: "Naughty Dog",
        genre: "Action-Adventure",
        releaseYear: 2013,
        sales: 17000000,
        img: "/images/default.jpg"
    },
    {
        id: 41,
        title: "Assassin's Creed Valhalla",
        publisher: "Ubisoft",
        developer: "Ubisoft Montreal",
        genre: "Action RPG",
        releaseYear: 2020,
        sales: 20000000,
        img: "/images/default.jpg"
    },
    {
        id: 42,
        title: "Star Wars Jedi: Fallen Order",
        publisher: "Electronic Arts",
        developer: "Respawn Entertainment",
        genre: "Action-Adventure",
        releaseYear: 2019,
        sales: 10000000,
        img: "/images/default.jpg"
    },
    {
        id: 43,
        title: "Persona 5",
        publisher: "Atlus",
        developer: "P-Studio",
        genre: "RPG",
        releaseYear: 2016,
        sales: 5000000,
        img: "/images/default.jpg"
    },
    {
        id: 44,
        title: "Far Cry 5",
        publisher: "Ubisoft",
        developer: "Ubisoft Montreal",
        genre: "FPS",
        releaseYear: 2018,
        sales: 25000000,
        img: "/images/default.jpg"
    },
    {
        id: 45,
        title: "The Division 2",
        publisher: "Ubisoft",
        developer: "Ubisoft Massive",
        genre: "Action RPG",
        releaseYear: 2019,
        sales: 10000000,
        img: "/images/default.jpg"
    },
    {
        id: 46,
        title: "Control",
        publisher: "505 Games",
        developer: "Remedy Entertainment",
        genre: "Action-Adventure",
        releaseYear: 2019,
        sales: 2000000,
        img: "/images/default.jpg"
    },
    {
        id: 47,
        title: "Death Stranding",
        publisher: "Sony Interactive Entertainment",
        developer: "Kojima Productions",
        genre: "Action",
        releaseYear: 2019,
        sales: 5000000,
        img: "/images/default.jpg"
    },
    {
        id: 48,
        title: "Resident Evil Village",
        publisher: "Capcom",
        developer: "Capcom",
        genre: "Horror",
        releaseYear: 2021,
        sales: 8000000,
        img: "/images/default.jpg"
    },
    {
        id: 49,
        title: "Rocket League",
        publisher: "Psyonix",
        developer: "Psyonix",
        genre: "Sports",
        releaseYear: 2015,
        sales: 60000000,
        img: "/images/default.jpg"
    },
    {
        id: 50,
        title: "Monster Hunter: World",
        publisher: "Capcom",
        developer: "Capcom",
        genre: "Action RPG",
        releaseYear: 2018,
        sales: 23000000,
        img: "/images/default.jpg"
    },
    {
        id: 51,
        title: "The Outer Worlds",
        publisher: "Private Division",
        developer: "Obsidian Entertainment",
        genre: "RPG",
        releaseYear: 2019,
        sales: 4000000,
        img: "/images/default.jpg"
    },
    {
        id: 52,
        title: "Final Fantasy VII Remake",
        publisher: "Square Enix",
        developer: "Square Enix",
        genre: "RPG",
        releaseYear: 2020,
        sales: 5000000,
        img: "/images/default.jpg"
    },
    {
        id: 53,
        title: "Sekiro: Shadows Die Twice",
        publisher: "Activision",
        developer: "FromSoftware",
        genre: "Action-Adventure",
        releaseYear: 2019,
        sales: 8000000,
        img: "/images/default.jpg"
    },
    {
        id: 54,
        title: "Hades",
        publisher: "Supergiant Games",
        developer: "Supergiant Games",
        genre: "Roguelike",
        releaseYear: 2020,
        sales: 1000000,
        img: "/images/default.jpg"
    },
    {
        id: 55,
        title: "Demon's Souls",
        publisher: "Sony Interactive Entertainment",
        developer: "Bluepoint Games",
        genre: "Action RPG",
        releaseYear: 2020,
        sales: 1500000,
        img: "/images/default.jpg"
    },
    {
        id: 56,
        title: "Ghostrunner",
        publisher: "505 Games",
        developer: "One More Level",
        genre: "Action",
        releaseYear: 2020,
        sales: 600000,
        img: "/images/default.jpg"
    }
];

export default gameData;
const gameData = [
    {
      "Название": "Dota2",
      "Жанр": "Moba",
      "Издатель": "Valve",
      "Разработчик": "Valve",
      "Год релиза": 2013,
      "Количество проданных копий": 5
    },
    {
      "Название": "Pubg",
      "Жанр": "action",
      "Издатель": "Krafton",
      "Разработчик": "PlayerUnknown’s",
      "Год релиза": 2018,
      "Количество проданных копий": 7
    },
    {
      "Название": "The witcher",
      "Жанр": "RPG",
      "Издатель": "CD project red",
      "Разработчик": "CD project red",
      "Год релиза": 2007,
      "Количество проданных копий": 10
    },
    {
      "Название": "The witcher 2",
      "Жанр": "RPG",
      "Издатель": "CD project red",
      "Разработчик": "CD project red",
      "Год релиза": 2012,
      "Количество проданных копий": 12
    },
    {
      "Название": "The witcher 3",
      "Жанр": "RPG",
      "Издатель": "CD project red",
      "Разработчик": "CD project red",
      "Год релиза": 2015,
      "Количество проданных копий": 35
    },
    {
      "Название": "Doom",
      "Жанр": "FPS",
      "Издатель": "Betchesda",
      "Разработчик": "ID software",
      "Год релиза": 2016,
      "Количество проданных копий": 1.3
    },
    {
      "Название": "Elden Ring",
      "Жанр": "Souls'like",
      "Издатель": "BondaiNamko",
      "Разработчик": "FromSoftware",
      "Год релиза": 2022,
      "Количество проданных копий": 25
    },
    {
      "Название": "Grand Theft Auto V",
      "Жанр": "Action-Adventure",
      "Издатель": "Rockstar Games",
      "Разработчик": "Rockstar North",
      "Год релиза": 2013,
      "Количество проданных копий": 185
    },
    {
      "Название": "Minecraft",
      "Жанр": "Sandbox",
      "Издатель": "Mojang",
      "Разработчик": "Mojang",
      "Год релиза": 2011,
      "Количество проданных копий": 240
    },
    {
      "Название": "The Legend of Zelda: Breath of the Wild",
      "Жанр": "Action-Adventure",
      "Издатель": "Nintendo",
      "Разработчик": "Nintendo",
      "Год релиза": 2017,
      "Количество проданных копий": 32
    },
    {
      "Название": "Red Dead Redemption 2",
      "Жанр": "Action-Adventure",
      "Издатель": "Rockstar Games",
      "Разработчик": "Rockstar Studios",
      "Год релиза": 2018,
      "Количество проданных копий": 55
    },
    {
      "Название": "Super Mario Odyssey",
      "Жанр": "Platformer",
      "Издатель": "Nintendo",
      "Разработчик": "Nintendo",
      "Год релиза": 2017,
      "Количество проданных копий": 25
    },
    {
      "Название": "Cyberpunk 2077",
      "Жанр": "RPG",
      "Издатель": "CD Projekt",
      "Разработчик": "CD Projekt Red",
      "Год релиза": 2020,
      "Количество проданных копий": 25
    },
    {
      "Название": "Call of Duty: Modern Warfare",
      "Жанр": "FPS",
      "Издатель": "Activision",
      "Разработчик": "Infinity Ward",
      "Год релиза": 2019,
      "Количество проданных копий": 30
    },
    {
      "Название": "FIFA 21",
      "Жанр": "Sports",
      "Издатель": "EA Sports",
      "Разработчик": "EA Vancouver",
      "Год релиза": 2020,
      "Количество проданных копий": 31
    },
    {
      "Название": "Animal Crossing: New Horizons",
      "Жанр": "Life Simulation",
      "Издатель": "Nintendo",
      "Разработчик": "Nintendo",
      "Год релиза": 2020,
      "Количество проданных копий": 42
    },
    {
      "Название": "Fortnite",
      "Жанр": "Battle Royale",
      "Издатель": "Epic Games",
      "Разработчик": "Epic Games",
      "Год релиза": 2017,
      "Количество проданных копий": 350
    },
    {
      "Название": "The Elder Scrolls V: Skyrim",
      "Жанр": "RPG",
      "Издатель": "Bethesda",
      "Разработчик": "Bethesda Game Studios",
      "Год релиза": 2011,
      "Количество проданных копий": 30
    },
    {
      "Название": "Halo 5: Guardians",
      "Жанр": "FPS",
      "Издатель": "Microsoft Studios",
      "Разработчик": "343 Industries",
      "Год релиза": 2015,
      "Количество проданных копий": 5
    },
    {
      "Название": "League of Legends",
      "Жанр": "MOBA",
      "Издатель": "Riot Games",
      "Разработчик": "Riot Games",
      "Год релиза": 2009,
      "Количество проданных копий": 115
    },
    {
      "Название": "World of Warcraft",
      "Жанр": "MMORPG",
      "Издатель": "Blizzard Entertainment",
      "Разработчик": "Blizzard Entertainment",
      "Год релиза": 2004,
      "Количество проданных копий": 120
    },
    {
      "Название": "The Sims 4",
      "Жанр": "Life Simulation",
      "Издатель": "Electronic Arts",
      "Разработчик": "Maxis",
      "Год релиза": 2014,
      "Количество проданных копий": 40
    },
    {
      "Название": "Overwatch",
      "Жанр": "FPS",
      "Издатель": "Blizzard Entertainment",
      "Разработчик": "Blizzard Entertainment",
      "Год релиза": 2016,
      "Количество проданных копий": 50
    },
    {
      "Название": "Valorant",
      "Жанр": "FPS",
      "Издатель": "Riot Games",
      "Разработчик": "Riot Games",
      "Год релиза": 2020,
      "Количество проданных копий": 14
    },
    {
      "Название": "Pokémon Sword and Shield",
      "Жанр": "RPG",
      "Издатель": "Nintendo",
      "Разработчик": "Game Freak",
      "Год релиза": 2019,
      "Количество проданных копий": 26
    },
    {
      "Название": "Horizon Zero Dawn",
      "Жанр": "Action RPG",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Guerrilla Games",
      "Год релиза": 2017,
      "Количество проданных копий": 20
    },
    {
      "Название": "Ghost of Tsushima",
      "Жанр": "Action-Adventure",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Sucker Punch Productions",
      "Год релиза": 2020,
      "Количество проданных копий": 9
    },
    {
      "Название": "Doom Eternal",
      "Жанр": "FPS",
      "Издатель": "Bethesda",
      "Разработчик": "id Software",
      "Год релиза": 2020,
      "Количество проданных копий": 5
    },
    {
      "Название": "The Last of Us Part II",
      "Жанр": "Action-Adventure",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Naughty Dog",
      "Год релиза": 2020,
      "Количество проданных копий": 10
    },
    {
      "Название": "The Last of Us",
      "Жанр": "Action-Adventure",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Naughty Dog",
      "Год релиза": 2013,
      "Количество проданных копий": 17
    },
    {
      "Название": "Assassin's Creed Valhalla",
      "Жанр": "Action RPG",
      "Издатель": "Ubisoft",
      "Разработчик": "Ubisoft Montreal",
      "Год релиза": 2020,
      "Количество проданных копий": 20
    },
    {
      "Название": "Star Wars Jedi: Fallen Order",
      "Жанр": "Action-Adventure",
      "Издатель": "Electronic Arts",
      "Разработчик": "Respawn Entertainment",
      "Год релиза": 2019,
      "Количество проданных копий": 10
    },
    {
      "Название": "Persona 5",
      "Жанр": "RPG",
      "Издатель": "Atlus",
      "Разработчик": "P-Studio",
      "Год релиза": 2016,
      "Количество проданных копий": 5
    },
    {
      "Название": "Far Cry 5",
      "Жанр": "FPS",
      "Издатель": "Ubisoft",
      "Разработчик": "Ubisoft Montreal",
      "Год релиза": 2018,
      "Количество проданных копий": 25
    },
    {
      "Название": "The Division 2",
      "Жанр": "Action RPG",
      "Издатель": "Ubisoft",
      "Разработчик": "Ubisoft Massive",
      "Год релиза": 2019,
      "Количество проданных копий": 10
    },
    {
      "Название": "Control",
      "Жанр": "Action-Adventure",
      "Издатель": "505 Games",
      "Разработчик": "Remedy Entertainment",
      "Год релиза": 2019,
      "Количество проданных копий": 2
    },
    {
      "Название": "Death Stranding",
      "Жанр": "Action",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Kojima Productions",
      "Год релиза": 2019,
      "Количество проданных копий": 5
    },
    {
      "Название": "Resident Evil Village",
      "Жанр": "Horror",
      "Издатель": "Capcom",
      "Разработчик": "Capcom",
      "Год релиза": 2021,
      "Количество проданных копий": 8
    },
    {
      "Название": "Genshin Impact",
      "Жанр": "Action RPG",
      "Издатель": "miHoYo",
      "Разработчик": "miHoYo",
      "Год релиза": 2020,
      "Количество проданных копий": 70
    },
    {
      "Название": "Apex Legends",
      "Жанр": "Battle Royale",
      "Издатель": "Electronic Arts",
      "Разработчик": "Respawn Entertainment",
      "Год релиза": 2019,
      "Количество проданных копий": 100
    },
    {
      "Название": "Rocket League",
      "Жанр": "Sports",
      "Издатель": "Psyonix",
      "Разработчик": "Psyonix",
      "Год релиза": 2015,
      "Количество проданных копий": 60
    },
    {
      "Название": "Monster Hunter: World",
      "Жанр": "Action RPG",
      "Издатель": "Capcom",
      "Разработчик": "Capcom",
      "Год релиза": 2018,
      "Количество проданных копий": 23
    },
    {
      "Название": "God of War",
      "Жанр": "Action-Adventure",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "SIE Santa Monica Studio",
      "Год релиза": 2018,
      "Количество проданных копий": 23
    },
    {
      "Название": "Among Us",
      "Жанр": "Party",
      "Издатель": "Innersloth",
      "Разработчик": "Innersloth",
      "Год релиза": 2018,
      "Количество проданных копий": 500
    },
    {
      "Название": "The Outer Worlds",
      "Жанр": "RPG",
      "Издатель": "Private Division",
      "Разработчик": "Obsidian Entertainment",
      "Год релиза": 2019,
      "Количество проданных копий": 4
    },
    {
      "Название": "Final Fantasy VII Remake",
      "Жанр": "RPG",
      "Издатель": "Square Enix",
      "Разработчик": "Square Enix",
      "Год релиза": 2020,
      "Количество проданных копий": 5
    },
    {
      "Название": "Sekiro: Shadows Die Twice",
      "Жанр": "Action-Adventure",
      "Издатель": "Activision",
      "Разработчик": "FromSoftware",
      "Год релиза": 2019,
      "Количество проданных копий": 8
    },
    {
      "Название": "Hades",
      "Жанр": "Roguelike",
      "Издатель": "Supergiant Games",
      "Разработчик": "Supergiant Games",
      "Год релиза": 2020,
      "Количество проданных копий": 1
    },
    {
      "Название": "Nier: Automata",
      "Жанр": "Action RPG",
      "Издатель": "Square Enix",
      "Разработчик": "PlatinumGames",
      "Год релиза": 2017,
      "Количество проданных копий": 7
    },
    {
      "Название": "Demon's Souls",
      "Жанр": "Action RPG",
      "Издатель": "Sony Interactive Entertainment",
      "Разработчик": "Bluepoint Games",
      "Год релиза": 2020,
      "Количество проданных копий": 1.5
    },
    {
      "Название": "Ghostrunner",
      "Жанр": "Action",
      "Издатель": "505 Games",
      "Разработчик": "One More Level",
      "Год релиза": 2020,
      "Количество проданных копий": 0.6
    }
];

export default gameData;
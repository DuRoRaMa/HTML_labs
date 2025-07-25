export type tGroup = {
  id: number,
  Группа: string | number,
  "Минимальные продажи": number,
  "Максимальные продажи": number,
  "Средние продажи": number,
}[];

export const publishers: tGroup = [
  { id: 1, Группа: "GSC Game World", "Минимальные продажи": 2000000, "Максимальные продажи": 2000000, "Средние продажи": 2000000 },
  { id: 2, Группа: "Electronic Arts", "Минимальные продажи": 10000000, "Максимальные продажи": 50000000, "Средние продажи": 28333333 },
  { id: 3, Группа: "Blizzard Entertainment", "Минимальные продажи": 6000000, "Максимальные продажи": 120000000, "Средние продажи": 42000000 },
  { id: 4, Группа: "Ubisoft", "Минимальные продажи": 5000000, "Максимальные продажи": 25000000, "Средние продажи": 13333333 },
  { id: 5, Группа: "CD Projekt", "Минимальные продажи": 10000000, "Максимальные продажи": 35000000, "Средние продажи": 18333333 },
  { id: 6, Группа: "Warner Bros. Games", "Минимальные продажи": 50000000, "Максимальные продажи": 50000000, "Средние продажи": 50000000 },
  { id: 7, Группа: "Valve", "Минимальные продажи": 0, "Максимальные продажи": 5000000, "Средние продажи": 2500000 },
  { id: 8, Группа: "Square Enix", "Минимальные продажи": 5000000, "Максимальные продажи": 7000000, "Средние продажи": 6000000 },
  { id: 9, Группа: "Krafton", "Минимальные продажи": 7000000, "Максимальные продажи": 7000000, "Средние продажи": 7000000 },
  { id: 10, Группа: "Bethesda", "Минимальные продажи": 1300000, "Максимальные продажи": 30000000, "Средние продажи": 10433333 },
  { id: 11, Группа: "Bandai Namco", "Минимальные продажи": 25000000, "Максимальные продажи": 25000000, "Средние продажи": 25000000 },
  { id: 12, Группа: "Rockstar Games", "Минимальные продажи": 55000000, "Максимальные продажи": 185000000, "Средние продажи": 120000000 },
  { id: 13, Группа: "Mojang", "Минимальные продажи": 240000000, "Максимальные продажи": 240000000, "Средние продажи": 240000000 },
  { id: 14, Группа: "Nintendo", "Минимальные продажи": 25000000, "Максимальные продажи": 42000000, "Средние продажи": 32333333 },
  { id: 15, Группа: "Epic Games", "Минимальные продажи": 350000000, "Максимальные продажи": 350000000, "Средние продажи": 350000000 },
  { id: 16, Группа: "Riot Games", "Минимальные продажи": 14000000, "Максимальные продажи": 115000000, "Средние продажи": 64500000 },
  { id: 17, Группа: "Innersloth", "Минимальные продажи": 500000000, "Максимальные продажи": 500000000, "Средние продажи": 500000000 },
  { id: 18, Группа: "miHoYo", "Минимальные продажи": 70000000, "Максимальные продажи": 70000000, "Средние продажи": 70000000 },
  { id: 19, Группа: "Sony Interactive Entertainment", "Минимальные продажи": 9000000, "Максимальные продажи": 23000000, "Средние продажи": 14666666 },
  { id: 20, Группа: "Capcom", "Минимальные продажи": 8000000, "Максимальные продажи": 23000000, "Средние продажи": 15500000 },
  { id: 21, Группа: "Activision", "Минимальные продажи": 8000000, "Максимальные продажи": 30000000, "Средние продажи": 19000000 },
  { id: 22, Группа: "Psyonix", "Минимальные продажи": 60000000, "Максимальные продажи": 60000000, "Средние продажи": 60000000 },
  { id: 23, Группа: "Private Division", "Минимальные продажи": 4000000, "Максимальные продажи": 4000000, "Средние продажи": 4000000 },
  { id: 24, Группа: "Supergiant Games", "Минимальные продажи": 1000000, "Максимальные продажи": 1000000, "Средние продажи": 1000000 },
  { id: 25, Группа: "505 Games", "Минимальные продажи": 600000, "Максимальные продажи": 2000000, "Средние продажи": 1300000 }
];

export const genres: tGroup = [
  { id: 1, Группа: "FPS/RPG", "Минимальные продажи": 2000000, "Максимальные продажи": 2000000, "Средние продажи": 2000000 },
  { id: 2, Группа: "FPS", "Минимальные продажи": 1300000, "Максимальные продажи": 30000000, "Средние продажи": 10433333 },
  { id: 3, Группа: "RTS", "Минимальные продажи": 6000000, "Максимальные продажи": 6000000, "Средние продажи": 6000000 },
  { id: 4, Группа: "Action-Adventure", "Минимальные продажи": 9000000, "Максимальные продажи": 185000000, "Средние продажи": 57333333 },
  { id: 5, Группа: "Tactical Shooter", "Минимальные продажи": 5000000, "Максимальные продажи": 5000000, "Средние продажи": 5000000 },
  { id: 6, Группа: "RPG", "Минимальные продажи": 4000000, "Максимальные продажи": 35000000, "Средние продажи": 13500000 },
  { id: 7, Группа: "Fighting", "Минимальные продажи": 50000000, "Максимальные продажи": 50000000, "Средние продажи": 50000000 },
  { id: 8, Группа: "MOBA", "Минимальные продажи": 0, "Максимальные продажи": 115000000, "Средние продажи": 57500000 },
  { id: 9, Группа: "Action RPG", "Минимальные продажи": 600000, "Максимальные продажи": 70000000, "Средние продажи": 21428571 },
  { id: 10, Группа: "MMORPG", "Минимальные продажи": 120000000, "Максимальные продажи": 120000000, "Средние продажи": 120000000 },
  { id: 11, Группа: "Life Simulation", "Минимальные продажи": 40000000, "Максимальные продажи": 42000000, "Средние продажи": 41000000 },
  { id: 12, Группа: "Battle Royale", "Минимальные продажи": 100000000, "Максимальные продажи": 350000000, "Средние продажи": 225000000 },
  { id: 13, Группа: "Sandbox", "Минимальные продажи": 240000000, "Максимальные продажи": 240000000, "Средние продажи": 240000000 },
  { id: 14, Группа: "Platformer", "Минимальные продажи": 25000000, "Максимальные продажи": 25000000, "Средние продажи": 25000000 },
  { id: 15, Группа: "Sports", "Минимальные продажи": 31000000, "Максимальные продажи": 60000000, "Средние продажи": 45500000 },
  { id: 16, Группа: "Horror", "Минимальные продажи": 8000000, "Максимальные продажи": 8000000, "Средние продажи": 8000000 },
  { id: 17, Группа: "Party", "Минимальные продажи": 500000000, "Максимальные продажи": 500000000, "Средние продажи": 500000000 },
  { id: 18, Группа: "Roguelike", "Минимальные продажи": 1000000, "Максимальные продажи": 1000000, "Средние продажи": 1000000 },
  { id: 19, Группа: "Souls-like", "Минимальные продажи": 25000000, "Максимальные продажи": 25000000, "Средние продажи": 25000000 }
];

export const years: tGroup = [
  { id: 1, Группа: 1992, "Минимальные продажи": 50000000, "Максимальные продажи": 50000000, "Средние продажи": 50000000 },
  { id: 2, Группа: 2001, "Минимальные продажи": 5000000, "Максимальные продажи": 5000000, "Средние продажи": 5000000 },
  { id: 3, Группа: 2004, "Минимальные продажи": 120000000, "Максимальные продажи": 120000000, "Средние продажи": 120000000 },
  { id: 4, Группа: 2007, "Минимальные продажи": 2000000, "Максимальные продажи": 12000000, "Средние продажи": 6333333 },
  { id: 5, Группа: 2009, "Минимальные продажи": 115000000, "Максимальные продажи": 115000000, "Средние продажи": 115000000 },
  { id: 6, Группа: 2010, "Минимальные продажи": 6000000, "Максимальные продажи": 6000000, "Средние продажи": 6000000 },
  { id: 7, Группа: 2011, "Минимальные продажи": 30000000, "Максимальные продажи": 240000000, "Средние продажи": 135000000 },
  { id: 8, Группа: 2012, "Минимальные продажи": 12000000, "Максимальные продажи": 12000000, "Средние продажи": 12000000 },
  { id: 9, Группа: 2013, "Минимальные продажи": 0, "Максимальные продажи": 185000000, "Средние продажи": 61666666 },
  { id: 10, Группа: 2014, "Минимальные продажи": 40000000, "Максимальные продажи": 40000000, "Средние продажи": 40000000 },
  { id: 11, Группа: 2015, "Минимальные продажи": 5000000, "Максимальные продажи": 60000000, "Средние продажи": 32500000 },
  { id: 12, Группа: 2016, "Минимальные продажи": 1300000, "Максимальные продажи": 50000000, "Средние продажи": 17100000 },
  { id: 13, Группа: 2017, "Минимальные продажи": 7000000, "Максимальные продажи": 32000000, "Средние продажи": 17000000 },
  { id: 14, Группа: 2018, "Минимальные продажи": 7000000, "Максимальные продажи": 55000000, "Средние продажи": 23500000 },
  { id: 15, Группа: 2019, "Минимальные продажи": 1000000, "Максимальные продажи": 26000000, "Средние продажи": 11800000 },
  { id: 16, Группа: 2020, "Минимальные продажи": 600000, "Максимальные продажи": 70000000, "Средние продажи": 14285714 },
  { id: 17, Группа: 2021, "Минимальные продажи": 8000000, "Максимальные продажи": 8000000, "Средние продажи": 8000000 },
  { id: 18, Группа: 2022, "Минимальные продажи": 25000000, "Максимальные продажи": 25000000, "Средние продажи": 25000000 }
];
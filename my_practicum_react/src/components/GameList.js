import React, { useState, useEffect } from 'react';
import GameFilter from './GameFilter';
import GameSorter from './GameSorter';
import Table from './Table';
import gameData from './data';
import './GameList.css';

const GameList = () => {
  const [games] = useState(gameData.map((game, index) => ({ id: index + 1, ...game })));
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  // Функция сброса к начальным значениям
  const resetToInitial = () => {
    setFilteredGames(games);
    setCurrentPage(1);
  };

  const applyFilter = (filters) => {
    const filtered = games.filter(game => {
      return (
        (!filters.name || game.Название.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.genre || game.Жанр.toLowerCase().includes(filters.genre.toLowerCase())) &&
        (!filters.publisher || game.Издатель.toLowerCase().includes(filters.publisher.toLowerCase())) &&
        (!filters.developer || game.Разработчик.toLowerCase().includes(filters.developer.toLowerCase())) &&
        (!filters.yearFrom || game['Год релиза'] >= parseInt(filters.yearFrom)) &&
        (!filters.yearTo || game['Год релиза'] <= parseInt(filters.yearTo)) &&
        (!filters.salesFrom || game['Количество проданных копий'] >= parseFloat(filters.salesFrom)) &&
        (!filters.salesTo || game['Количество проданных копий'] <= parseFloat(filters.salesTo))
      );
    });
    
    setFilteredGames(filtered);
    setCurrentPage(1);
  };

  const applySort = (sortConfig) => {
    const sortedGames = [...filteredGames].sort((a, b) => {
      for (const config of sortConfig) {
        if (!config.field) continue;
        
        const field = config.field;
        const valueA = a[field];
        const valueB = b[field];
        
        if (field === 'Год релиза' || field === 'Количество проданных копий') {
          if (parseFloat(valueA) < parseFloat(valueB)) return config.desc ? 1 : -1;
          if (parseFloat(valueA) > parseFloat(valueB)) return config.desc ? -1 : 1;
        } else {
          if (valueA < valueB) return config.desc ? 1 : -1;
          if (valueA > valueB) return config.desc ? -1 : 1;
        }
      }
      return 0;
    });
    
    setFilteredGames(sortedGames);
  };

  const columns = [
    'Название', 
    'Жанр', 
    'Издатель', 
    'Разработчик', 
    'Год релиза', 
    'Количество проданных копий'
  ];

  return (
    <div className="game-list-container">
      <div className="menu">
        Menu:<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<a href="/main">Самые продаваемые игры</a><br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3><a href="/list">Список самых продаваемых игр</a></h3>
        <hr />
      </div>

      <div className="container">
        <div className="settings-column">
          <details>
            <summary>График</summary>
            <div className="chart-form">
              <p><b>Значение по оси OX</b></p>
              <label>
                <input type="radio" name="xAxis" value="Жанр" defaultChecked /> Жанр
              </label>
              <label>
                <input type="radio" name="xAxis" value="Год релиза" /> Год релиза
              </label>
              <label>
                <input type="radio" name="xAxis" value="Издатель" /> Издатель
              </label>
              
              <p><b>Результат</b></p>
              <label>
                <input type="checkbox" name="yAxis" value="max" defaultChecked /> Максимальное количество продаж
              </label>
              <label>
                <input type="checkbox" name="yAxis" value="min" /> Минимальное количество продаж
              </label>
              
              <select>
                <option value="scatter">Точечная</option>
                <option value="histogram">Гистограмма</option>
                <option value="line">График</option>
              </select>
              <button type="button">Построить</button>
            </div>
          </details>

          <details>
            <summary>Фильтр</summary>
            <GameFilter applyFilter={applyFilter} />
          </details>

          <details>
            <summary>Сортировка</summary>
            <GameSorter 
              columns={columns} 
              applySort={applySort}
              resetToInitial={resetToInitial}  // Передаем функцию сброса
            />
          </details>
        </div>

        <div className="charts-column">
          <Table 
            data={filteredGames} 
            columns={columns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <br /><br /><br />
      <hr />
    </div>
  );
};

export default GameList;
import React, { useState } from 'react';

const GameSorter = ({ columns, applySort, resetToInitial }) => {
  const [sortConfig, setSortConfig] = useState([
    { field: '', desc: false },
    { field: '', desc: false },
    { field: '', desc: false },
  ]);

  const handleFieldChange = (index, value) => {
    const newConfig = [...sortConfig];
    
    // Сбрасываем все последующие уровни при изменении текущего
    for (let i = index; i < sortConfig.length; i++) {
      if (i === index) {
        newConfig[i].field = value;
      } else {
        newConfig[i].field = '';
        newConfig[i].desc = false;
      }
    }
    
    setSortConfig(newConfig);
  };

  const handleDescChange = (index, checked) => {
    const newConfig = [...sortConfig];
    newConfig[index].desc = checked;
    setSortConfig(newConfig);
  };

  const handleSort = (e) => {
    e.preventDefault();
    // Фильтруем только заполненные уровни сортировки
    applySort(sortConfig.filter(item => item.field !== ''));
  };

  const handleReset = () => {
    setSortConfig([
      { field: '', desc: false },
      { field: '', desc: false },
      { field: '', desc: false },
    ]);
    
    // Сбрасываем таблицу до начальных значений
    resetToInitial();
  };

  // Определяем доступность каждого уровня
  const isLevelDisabled = (index) => {
    if (index === 0) return false; // Первый уровень всегда доступен
    return !sortConfig[index - 1].field; // Уровень доступен только если заполнен предыдущий
  };

  return (
    <form id="sort" onSubmit={handleSort}>
      <p>Сортировать по</p>
      
      {sortConfig.map((config, index) => (
        <p key={index}>
          <select
            value={config.field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            disabled={isLevelDisabled(index)}
          >
            <option value="">-- не выбрано --</option>
            {columns.map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
          по убыванию? 
          <input 
            type="checkbox" 
            checked={config.desc}
            onChange={(e) => handleDescChange(index, e.target.checked)}
            disabled={isLevelDisabled(index) || !config.field}
          />
        </p>
      ))}
      
      <button type="submit">Сортировать</button>
      <button type="button" onClick={handleReset}>Сбросить сортировку</button>
    </form>
  );
};

export default GameSorter;
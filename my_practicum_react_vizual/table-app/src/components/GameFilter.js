import React, { useRef } from 'react';

const GameFilter = ({ applyFilter }) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const filters = {
      name: formData.get('name')?.trim().toLowerCase() || '',
      genre: formData.get('genre')?.trim().toLowerCase() || '',
      publisher: formData.get('publisher')?.trim().toLowerCase() || '',
      developer: formData.get('developer')?.trim().toLowerCase() || '',
      yearFrom: formData.get('yearFrom') || '',
      yearTo: formData.get('yearTo') || '',
      salesFrom: formData.get('salesFrom') || '',
      salesTo: formData.get('salesTo') || '',
    };

    applyFilter(filters);
  };

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
      applyFilter({
        name: '',
        genre: '',
        publisher: '',
        developer: '',
        yearFrom: '',
        yearTo: '',
        salesFrom: '',
        salesTo: '',
      });
    }
  };

  return (
    <form id="filter" onSubmit={handleSubmit} ref={formRef}>
      <p>
        <label htmlFor="name">Название:</label>
        <input 
          type="text" 
          id="name" 
          name="name"
        />
      </p>
      <p>
        <label htmlFor="genre">Жанр:</label>
        <input 
          type="text" 
          id="genre" 
          name="genre"
        />
      </p>
      <p>
        <label htmlFor="publisher">Издатель:</label>
        <input 
          type="text" 
          id="publisher" 
          name="publisher"
        />
      </p>
      <p>
        <label htmlFor="developer">Разработчик:</label>
        <input 
          type="text" 
          id="developer" 
          name="developer"
        />
      </p>
      <p>
        <label>Год выхода:</label>
        От <input 
          type="number" 
          id="yearFrom" 
          name="yearFrom" 
          min="1950" 
          max="2025"
        />
        До <input 
          type="number" 
          id="yearTo" 
          name="yearTo" 
          min="1950" 
          max="2025"
        />
      </p>
      <p>
        <label>Количество проданных копий (млн):</label>
        От: <input 
          type="number" 
          id="salesFrom" 
          name="salesFrom" 
          min="0" 
          step="0.1"
        />
        До: <input 
          type="number" 
          id="salesTo" 
          name="salesTo" 
          min="0" 
          step="0.1"
        />
      </p>
      <button type="submit">Найти</button>
      <button type="button" onClick={handleClear}>Очистить фильтры</button>
    </form>
  );
};

export default GameFilter;
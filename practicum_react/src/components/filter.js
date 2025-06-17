/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = {
      Название: event.target.structure.value.trim().toLowerCase(),
      Тип: event.target.type.value.trim().toLowerCase(),
      Страна: event.target.country.value.trim().toLowerCase(),
      Город: event.target.city.value.trim().toLowerCase(),
      Год_от: event.target.year_from.value,
      Год_до: event.target.year_to.value,
      Высота_от: event.target.height_from.value,
      Высота_до: event.target.height_to.value
    };

    let filteredData = props.fullData.filter(item => {
      // Проверка текстовых полей
      const textFields = ["Название", "Тип", "Страна", "Город"];
      for (const field of textFields) {
        const formValue = formData[field];
        if (formValue && !(item[field]?.toString().toLowerCase().includes(formValue))) {
          return false;
        }
      }

      // Проверка числовых полей
      if (formData.Год_от && item.Год < parseInt(formData.Год_от)) return false;
      if (formData.Год_до && item.Год > parseInt(formData.Год_до)) return false;
      if (formData.Высота_от && item.Высота < parseFloat(formData.Высота_от)) return false;
      if (formData.Высота_до && item.Высота > parseFloat(formData.Высота_до)) return false;

      return true;
    });

    props.filtering(filteredData);
  }

  // Обработчик сброса формы
  const handleReset = () => {
    // Возвращаем исходные данные
    props.filtering(props.fullData);
  };

  return (
       <form onSubmit={ handleSubmit } onReset={handleReset}>
        <p>
          <label>Название: </label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Тип: </label>		
          <input name="type" type="text" />
        </p>
        <p>
          <label>Страна: </label>		
          <input name="country" type="text" />
        </p>
        <p>
          <label>Город: </label>		
          <input name="city" type="text" />
        </p>
        <p>
          <label>Год от: </label>		
          <input name="year_from" type="number" min="0" />
        </p>
        <p>
          <label>Год до: </label>		
          <input name="year_to" type="number" min="0" />
        </p>
        <p>
          <label>Высота от: </label>		
          <input name="height_from" type="number" min="0" />
        </p>
        <p>
          <label>Высота до: </label>		
          <input name="height_to" type="number" min="0" />
        </p>
        <p>         
          <button type="submit">Фильтровать</button>   
		  <button type="reset">Очистить фильтр</button>
		</p>  
      </form>
    )
}

export default Filter;
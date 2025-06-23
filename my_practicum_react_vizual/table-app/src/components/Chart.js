import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
   const [ox, setOx] = useState("Жанр");
   const [oy, setOy] = useState([true, false]);
   const [chartType, setChartType] = useState("scatter");
   const [error, setError] = useState("");
   const [showError, setShowError] = useState(false);
   const [chartData, setChartData] = useState([]);
   
   // Состояния для временного хранения настроек до нажатия кнопки
   const [pendingOx, setPendingOx] = useState(ox);
   const [pendingOy, setPendingOy] = useState(oy);
   const [pendingChartType, setPendingChartType] = useState(chartType);
   const formRef = useRef(null);

   // Автоматическое обновление при изменении фильтров данных
   useEffect(() => {
        if (props.data && props.data.length > 0) {
          const newData = createArrGraph(props.data, ox);
          setChartData(newData);
        } else {
          setChartData([]);
        }
   }, [props.data]); // Только при изменении данных

   const handleCheckboxChange = (index) => {
        const newOy = [...pendingOy];
        newOy[index] = !newOy[index];
        setPendingOy(newOy);
        
        // Сбрасываем ошибку при изменении чекбокса
        if (error || showError) {
            setError("");
            setShowError(false);
        }
   }

   const handleSubmit = (event) => {        
        event.preventDefault();
        
        if (!pendingOy[0] && !pendingOy[1]) {
            setError("Выберите хотя бы одно значение для оси OY");
            setShowError(true);
            return;
        }
        
        setError("");
        setShowError(false);
        
        // Применяем все настройки только после нажатия кнопки
        setOx(pendingOx);
        setOy(pendingOy);
        setChartType(pendingChartType);
        
        // Обновляем данные
        if (props.data && props.data.length > 0) {
          const newData = createArrGraph(props.data, pendingOx);
          setChartData(newData);
        } else {
          setChartData([]);
        }
   }

   const createArrGraph = (data, key) => {   
       if (!data || data.length === 0) return [];
    
       const groupObj = d3.group(data, d => d[key]);
       let arrGraph = [];
    
       for (let entry of groupObj) {
           const sales = entry[1].map(d => d['Количество проданных копий']);
           if (sales.length === 0) continue;
        
           const min = d3.min(sales);
           const max = d3.max(sales);
        
           if (typeof min !== 'number' || isNaN(min) || typeof max !== 'number' || isNaN(max)) continue;
        
           let labelX = entry[0];
           if (key === "Год релиза") {
               labelX = Number(labelX);
               if (isNaN(labelX)) continue;
           }
        
           arrGraph.push({
               labelX: labelX, 
               values: [min, max]
           });
       }
    
       if (key === "Год релиза") {
           arrGraph.sort((a, b) => a.labelX - b.labelX);
       }
    
       return arrGraph;
   }

   return (
    <div className="chart-container">
      <form onSubmit={handleSubmit} ref={formRef}>
        <p><b>Значение по оси OX:</b></p>
        <div>
          <label>
            <input 
              type="radio" 
              name="ox" 
              value="Жанр" 
              checked={pendingOx === "Жанр"}
              onChange={() => setPendingOx("Жанр")}
            /> Жанр
          </label>
          <br/>        
          <label>
            <input 
              type="radio" 
              name="ox" 
              value="Год релиза" 
              checked={pendingOx === "Год релиза"}
              onChange={() => setPendingOx("Год релиза")}
            /> Год релиза
          </label>
          <br/>
          <label>
            <input 
              type="radio" 
              name="ox" 
              value="Издатель" 
              checked={pendingOx === "Издатель"}
              onChange={() => setPendingOx("Издатель")}
            /> Издатель
          </label>
        </div>

        <p><b>Значение по оси OY:</b></p>
        <div>
          <label>
            <input 
              type="checkbox" 
              name="oy0" 
              checked={pendingOy[0]} 
              onChange={() => handleCheckboxChange(0)}
              style={showError ? { outline: '2px solid red' } : {}}
            /> Максимальное количество продаж
          </label>
          <br/>
          <label>
            <input 
              type="checkbox" 
              name="oy1" 
              checked={pendingOy[1]} 
              onChange={() => handleCheckboxChange(1)}
              style={showError ? { outline: '2px solid red' } : {}}
            /> Минимальное количество продаж
          </label>
        </div>
        
        <p><b>Тип диаграммы:</b></p>
        <select 
          name="chartType" 
          value={pendingChartType} 
          onChange={(e) => setPendingChartType(e.target.value)}
        >
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>
        
        {error && <p style={{color: "red"}}>{error}</p>}

        <p>  
          <button type="submit">Построить</button>
        </p>
      </form>
      <ChartDraw 
        data={chartData}
        oy={oy} 
        chartType={chartType}
        ox={ox}
      />     
    </div>
   )
}

export default Chart;
import { useState } from "react";
import * as d3 from "d3";
import ChartDraw from './ChartDraw.js';
const Chart = (props) => {
   const [ox, setOx] = useState("Страна");
   const [oy, setOy] = useState([true, false]);
   const [chartType, setChartType] = useState("scatter");
   const [error, setError] = useState("");
   const [showError, setShowError] = useState(false);

   // Обработчик изменения чекбоксов
   const handleCheckboxChange = (index) => {
        const newOy = [...oy];
        newOy[index] = !newOy[index];
        setOy(newOy);
        
        // Сбрасываем ошибку при изменении состояния чекбокса
        if (error || showError) {
            setError("");
            setShowError(false);
        }
   }

   const handleSubmit = (event) => {        
        event.preventDefault();
        const oy0 = event.target.oy[0].checked;
        const oy1 = event.target.oy[1].checked;
        
        if (!oy0 && !oy1) {
            setError("Выберите хотя бы одно значение для оси OY");
            setShowError(true);
            return;
        }
        setError("");
        setShowError(false);
        setOx(event.target.ox.value); 
        setOy([oy0, oy1]);
        setChartType(event.target.chartType.value);
   }

    const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        
        if (key === "Год") {
            arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
        }
        
        return arrGraph;
    }

   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p> Значение по оси OX: </p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"}/>
          Страна
          <br/>        
          <input type="radio" name="ox" value="Год" />
          Год
        </div>

        <p> Значение по оси OY </p>
        <div>
           <input 
             type="checkbox" 
             name="oy" 
             checked={oy[0]} // Управляемое состояние
             onChange={() => handleCheckboxChange(0)} // Обработчик изменения
             style={showError ? { outline: '2px solid red' } : {}}
           />
          Максимальная высота <br/>
          <input 
             type="checkbox" 
             name="oy" 
             checked={oy[1]} // Управляемое состояние
             onChange={() => handleCheckboxChange(1)} // Обработчик изменения
             style={showError ? { outline: '2px solid red' } : {}}
           />
          Минимальная высота
        </div>
        
        <p>Тип диаграммы:</p>
        <select name="chartType">
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>
        
        {error && <p style={{color: "red"}}>{error}</p>}

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>
      <ChartDraw 
        data={createArrGraph(props.data, ox)} 
        oy={oy} 
        chartType={chartType}
        ox={ox}
      />     
    </>
    )
}

export default Chart;
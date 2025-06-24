import { BarChart } from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import React from 'react';
import SettingChart from "./SettingChart";
import { LineChart } from '@mui/x-charts/LineChart';

interface GroupChartProps {
  data: tGroup;
  groupType: string;
}

function GroupChart({ data, groupType }: GroupChartProps) {
  const chartSetting = {
    yAxis: [
      { 
        label: 'Высота (м)',
        labelStyle: {
          fontSize: 14,
          fill: '#666'
        }
      }
    ],
    height: 400,
  };
  
  const [series, setSeries] = React.useState({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true); // Добавлено состояние isBar

  const seriesY = Object.entries(series)
    .filter(item => item[1] === true)
    .map(item => ({
      dataKey: item[0],
      label: item[0]
    }));
  
  const showBarLabels = seriesY.length === 1;

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <SettingChart 
        series={series} 
        setSeries={setSeries} 
        isBar={isBar}         // Передано состояние isBar
        setIsBar={setIsBar}   // Передана функция setIsBar
      />
      {isBar ? (
        <BarChart
          {...(showBarLabels && { barLabel: "value" })}
          dataset={data}
          xAxis={[{ 
            scaleType: 'band', 
            dataKey: 'Группа',
            label: groupType
          }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ 
            scaleType: 'band', 
            dataKey: 'Группа',
            label: groupType
          }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      )}
    </Container>
  );
}

export default GroupChart;
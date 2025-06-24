import { BarChart } from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import { tGroup } from "./groupdata";
import React from 'react';
import SettingChart from "./SettingsChart";
import { LineChart } from '@mui/x-charts/LineChart';

interface GroupChartProps {
  data: tGroup;
  groupType: string;
}

function GroupChart({ data, groupType }: GroupChartProps) {
  const chartSetting = {
    yAxis: [
      { 
        label: 'Продажи (млн)',
        labelStyle: {
          fontSize: 14,
          fill: '#666'
        }
      }
    ],
    height: 400,
  };
  
  const [series, setSeries] = React.useState({
    'Максимальные продажи': true,
    'Средние продажи': false,
    'Минимальные продажи': false,
  });

  const [isBar, setIsBar] = React.useState(true);

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
        isBar={isBar}
        setIsBar={setIsBar}
      />
      {isBar ? (
        <BarChart
          
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
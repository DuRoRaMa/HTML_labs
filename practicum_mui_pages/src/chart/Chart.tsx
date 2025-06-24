import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Navbar from '../components/Navbar';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import { countries, years, types, tGroup } from './groupdata';

type tSelect = "Страна" | "Год" | "Тип";

export default function Chart() {
  const [group, setGroup] = useState<tSelect>("Страна");
  const [groupData, setGroupData] = useState<tGroup>(countries);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    
    switch (value) {
      case "Страна":
        setGroupData(countries);
        break;
      case "Год":
        setGroupData(years);
        break;
      case "Тип":
        setGroupData(types);
        break;
    }
  };

  return (
    <div>
      <Navbar active="chart" />
      <Box sx={{ 
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        p: 3
      }}>
        <Box sx={{ width: 200, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Группировать по</InputLabel>
            <Select
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleChange}
            >
              <MenuItem value="Страна">Стране</MenuItem>
              <MenuItem value="Год">Году</MenuItem>
              <MenuItem value="Тип">Типу</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <GroupChart data={groupData} groupType={group} />
        <GroupGrid data={groupData} />
      </Box>
    </div>
  );
}
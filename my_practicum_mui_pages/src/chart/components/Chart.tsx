import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Navbar from '../../components/Navbar';
import GroupGrid from './GroupGrid';
import GroupChart from './GroupChart';
import { publishers, years, genres, tGroup } from './groupdata';

type tSelect = "Издатель" | "Год" | "Жанр";

export default function Chart() {
  const [group, setGroup] = useState<tSelect>("Издатель");
  const [groupData, setGroupData] = useState<tGroup>(publishers);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    
    switch (value) {
      case "Издатель":
        setGroupData(publishers);
        break;
      case "Год":
        setGroupData(years);
        break;
      case "Жанр":
        setGroupData(genres);
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
              <MenuItem value="Издатель">Издателю</MenuItem>
              <MenuItem value="Год">Году</MenuItem>
              <MenuItem value="Жанр">Жанру</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <GroupChart data={groupData} groupType={group} />
        <GroupGrid data={groupData} />
      </Box>
    </div>
  );
}
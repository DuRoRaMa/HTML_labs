import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type tSeries = {
  'Максимальная высота': boolean,
  'Средняя высота': boolean,
  'Минимальная высота': boolean,
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === 'bar');
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: "20px 0" }}
    >
      <FormControl>
        <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
        <RadioGroup
          name="group-radio"
          value={isBar ? "bar" : "dot"}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="bar"
            control={<Radio />}
            label="Гистограмма"
          />
          <FormControlLabel
            value="dot"
            control={<Radio />}
            label="Линейная"
          />
        </RadioGroup>
      </FormControl>
      
      <FormControl>
        <FormLabel id="label-checkbox-group">На диаграмме показать:</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Максимальная высота"]}
              onChange={handleCheckboxChange}
              name="Максимальная высота"
            />
          }
          label="максимальную высоту"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Средняя высота"]}
              onChange={handleCheckboxChange}
              name="Средняя высота"
            />
          }
          label="среднюю высоту"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Минимальная высота"]}
              onChange={handleCheckboxChange}
              name="Минимальная высота"
            />
          }
          label="минимальную высоту"
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
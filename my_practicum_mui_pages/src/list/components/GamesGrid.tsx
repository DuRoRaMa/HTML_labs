import games from "../table";
import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

const columns = [
  { field: 'title', headerName: 'Название', flex: 1 },
  { field: 'publisher', headerName: 'Издатель', flex: 0.7 },
  { field: 'developer', headerName: 'Разработчик', flex: 0.7 },
  { field: 'genre', headerName: 'Жанр', flex: 0.5 },
  { field: 'releaseYear', headerName: 'Год', flex: 0.3 },
  { 
    field: 'sales', 
    headerName: 'Продажи',
  },
];

export default function GamesGrid() {
  return (
    <Container maxWidth="lg" sx={{ height: 700, mt: 2 }}>
      <DataGrid
        rows={games}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 25]}
        showToolbar = {true}
      />
    </Container>
  );
}
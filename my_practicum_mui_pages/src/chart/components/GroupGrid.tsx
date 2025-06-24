import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { tGroup } from "./groupdata";
import { useState } from 'react';

type GroupProps = {
  data: tGroup;
};

const columns: GridColDef[] = [
  { 
    field: 'Группа', 
    headerName: 'Группа', 
    flex: 1,
    minWidth: 150 
  },
  { 
    field: 'Минимальные продажи', 
    headerName: 'Минимальные продажи', 
    flex: 1,
    minWidth: 150 
  },
  { 
    field: 'Максимальные продажи', 
    headerName: 'Максимальные продажи', 
    flex: 1,
    minWidth: 150 
  },
  { 
    field: 'Средние продажи', 
    headerName: 'Средние продажи', 
    flex: 1,
    minWidth: 150 
  },
];

export default function GroupGrid({ data }: GroupProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={data}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5]}
    
        disableColumnMenu 
      />
    </div>
  );
}
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { tGroup } from "../groupdata";
import { useState } from 'react';

type GroupProps = {
  data: tGroup;
};

const columns: GridColDef[] = [
  { field: 'Группа', headerName: 'Группа', width: 200 },
  { field: 'Минимальная высота', headerName: 'Минимальная высота', width: 150 },
  { field: 'Максимальная высота', headerName: 'Максимальная высота', width: 150 },
  { field: 'Средняя высота', headerName: 'Средняя высота', width: 150 },
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
      />
    </div>
  );
}
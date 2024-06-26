import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { apiDeleteTable } from '../../api';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'documentName', label: 'documentName', minWidth: 100 },
  { id: 'companySigDate', label: 'companySigDate', minWidth: 100 },
  { id: 'companySignatureName', label: 'companySignatureName', minWidth: 100 },
  { id: 'documentStatus', label: 'documentStatus', minWidth: 100 },
  { id: 'documentType', label: 'documentStatus', minWidth: 100 },
  { id: 'employeeNumber', label: 'employeeNumber', minWidth: 100 },
  { id: 'employeeSigDate', label: 'employeeSigDate', minWidth: 100 },
  { id: 'employeeSignatureName', label: 'employeeSignatureName', minWidth: 100 },
];

export const TablesShow = ({data, token, refetch}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {data.map((row) => {
              return (
              <TableRow 
              tabIndex={-1}
              hover role="checkbox"  
              key={row.id}
              >
                {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
                  </TableCell>
                        
                  );
                 })}
                  <TableCell>
                    <IconButton
                    onClick={()=>navigate(`/v5test/edit/${row.id}`)}
                    > <EditNoteIcon/>
                    </IconButton>
                    
                    <IconButton
                    onClick={()=>apiDeleteTable(row.id, token, refetch)}
                    sx={{marginTop:1}}aria-label="delete">
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
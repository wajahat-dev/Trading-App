import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CLoader from './globalcomponents/CLoader';
import { useState } from "react";
import { Button, Card, Icon, Modal } from "@material-ui/core";
import CModal from './globalcomponents/CModal';
import DeleteForever from '@mui/icons-material/DeleteForever';

export default function PendingRequestTable() {

  const [loader, setLoader] = React.useState(false)
  const [gridData, setGridData] = React.useState([])
  const [globalState, setGlobalState] = useState({
    header: '',
    message: '',
    modal: false,
    selectedRow: {}
  })
  const columns = [
    { field: 'emailOrUsername', headerName: 'User Name', width: 150, },
    { field: 'cnic', headerName: 'CNIC', width: 150, },
    { field: 'email', headerName: 'Email', width: 150, },
    { field: 'phone', headerName: 'Phone', width: 150, },
    { field: 'country', headerName: 'Country', width: 150, },
    { field: 'dob', headerName: 'Date of Birth', width: 150, },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {}

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          setGlobalState(p => ({ ...p, selectedRow: thisRow, modal: true, message: 'Do you want to suspend the User', header:'User Suspension' }))
        };

        return <Button
          variant="outlined"
          color="danger"
          endDecorator={<DeleteForever />}
          onClick={onClick}
        >
          Suspend
        </Button>
      },
    }]

  const getData = async () => {
    debugger
    setLoader(true)
    try {
      const response = await fetch(`https://localhost:7000/api/userallprofile`, {
        method: "get",
        "accept": '*/*',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGridData(data)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  };

  React.useEffect(() => {
    getData()
  }, [])

  const onClickModal = () => {


    
    setGlobalState(p => ({ ...p, modal: false }))
  }

  return (

    <>
      <CLoader enabled={loader} />
      <CModal open={globalState.modal} labels={{ one: 'Suspend User', two: 'Cancel' }} onClick={onClickModal} onClose={() => setGlobalState(p => ({ ...p, modal: false }))} header={globalState.header} message={globalState.message} />
      <div style={{ width: '100%', marginTop: 10 }}>
        <DataGrid
          rows={gridData}
          columns={columns}
          getRowId={(row) => row.emailOrUsername + row.email}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight autoWidth
        // checkboxSelection
        />
      </div>
    </>

  );
}
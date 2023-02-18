import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CLoader from './globalcomponents/CLoader';
import { useState } from "react";
import { Button, Card, Icon, Modal } from "@material-ui/core";
import CModal from './globalcomponents/CModal';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { CheckemptyDate, ToDatabaseFormat } from './Globalfunc/func';
import CHeader from './globalcomponents/CHeader';

const selectedRow =
{
  "userId": "",
  "emailOrUsername": "",
  "useriD1": "",
  "cnic": "",
  "email": "",
  "displayname": "",
  "phone": "",
  "country": "",
  "dob": "",
  "createdon": "",
  inActivedate: ''
}



export default function DataTable() {

  const [loader, setLoader] = React.useState(false)
  const [gridData, setGridData] = React.useState([])
  const [globalState, setGlobalState] = useState({
    header: '',
    message: '',
    modal: false,
    selectedRow: { ...selectedRow }
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

          // const api = params.api;
          // const thisRow = {}

          // api
          //   .getAllColumns()
          //   .filter((c) => c.field !== '__check__' && !!c)
          //   .forEach(
          //     (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          //   );
          setGlobalState(p => ({ ...p, selectedRow: params.row, modal: true, message: 'Do you want to suspend the User', header: 'User Suspension' }))
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
    },
    {
      field: 'inActivedate',
      headerName: 'Is Suspended',
      sortable: false,
      renderCell: (params) => {

        return CheckemptyDate(ToDatabaseFormat(params.row.inActivedate)) ? 'Yes' : 'No'
      },
    }
  ]

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

  const onClickModal = async (isSuspendAction) => {
    setLoader(true)

    try {
      const response = await fetch(`https://localhost:7000/api/suspend-user`, {
        method: "post",
        "accept": '*/*',
        body: JSON.stringify({
          "userId": globalState.selectedRow.userId,
          "adminID": "string",
          "isSuspendAction": isSuspendAction
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,

        },
      });
      if (response.ok) {
        getData()
      }
      setGlobalState(p => ({ ...p, modal: false }))

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  return (

    <>
      <CLoader enabled={loader} />
      <CModal open={globalState.modal}
        labels={{ one: 'Suspend User', two: 'Un Suspend User' }}
        onClose={() => onClickModal(false)}
        onClick={() => onClickModal(true)}
        header={globalState.header} message={globalState.message} />
      <div style={{ width: '100%', marginTop: 10 }}>
        <CHeader header='Accounts Status'/>
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
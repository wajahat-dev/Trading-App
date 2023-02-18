import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CLoader from './globalcomponents/CLoader';
import { useState } from "react";
import { Button, Card, Icon, Modal } from "@material-ui/core";
import CModal from './globalcomponents/CModal';
import DeleteForever from '@mui/icons-material/DeleteForever';
import CHeader from './globalcomponents/CHeader';
import CNotification from './globalcomponents/CNotification';

const selectedRow = {
    "id_pk": 0,
    "usernameOrEmail": "",
    "userId": "",
    "payload": "",
    "approved": false,
    "desc": "",
    "createdOn": ""
}


export default function PendingRequestTable() {

    const [loader, setLoader] = React.useState(false)
    const [gridData, setGridData] = React.useState([])
    const [globalState, setGlobalState] = useState({
        header: '',
        message: '',
        modal: false,
        selectedRow: { ...selectedRow },
        notificationToast: false
    })
    React.useEffect(() => {
        getData()
    }, [])


    const columns = [
        { field: 'usernameOrEmail', headerName: 'User Name', width: 150, },
        { field: 'userId', headerName: 'User ID', width: 150, },
        { field: 'desc', headerName: 'Desc', width: 150, },
        { field: 'createdOn', headerName: 'Created At', width: 150, },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setGlobalState(p => ({ ...p, selectedRow: params.row, modal: true, message: 'Do you want to Approve the Payment', header: 'Payment Approval' }))
                };

                return <Button
                    variant="outlined"
                    color="danger"
                    endDecorator={<DeleteForever />}
                    onClick={onClick}
                >
                    Approved
                </Button>
            },
        },
        {
            field: 'approved',
            headerName: 'Is Approved',
            sortable: false,
            renderCell: (params) => {
                return params.row.approved ? 'Yes' : 'No'
            },
        }]

    const getData = async (row) => {
        debugger
        setLoader(true)
        try {
            const response = await fetch(`https://localhost:7000/api/allpending-request`, {
                method: "get",
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
                if (data.success) {
                    setGridData(data.information)
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    };



    const onClickModal = async () => {

        setLoader(true)
        try {
            const response = await fetch(`https://localhost:7000/api/jc_wallet`, {
                method: "post",
                body: JSON.stringify({
                    "emailOrUsername": globalState.selectedRow.usernameOrEmail,
                    "userID": globalState.selectedRow.userId,
                    "description": "string",
                    "payload": "string"
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
                const data = await response.json();
                if (data.pp_ResponseMessage) {
                    setGlobalState(p => ({ ...p, message: data.pp_ResponseMessage, notificationToast: true }))

                }else{
                    getData()
                }
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
      <CNotification isOpen={globalState.notificationToast} setOpen={e => setGlobalState(p => ({ ...p, notificationToast: e }))} message={globalState.message} />

            <CModal open={globalState.modal} labels={{ one: 'Yes Approve', two: 'Cancel' }} onClick={onClickModal} onClose={() => setGlobalState(p => ({ ...p, modal: false }))} header={globalState.header} message={globalState.message} />
            <div style={{ width: '100%', marginTop: 10 }}>
                <CHeader header='User to be Approved:'/>
                <DataGrid
                    rows={gridData}
                    columns={columns}
                    getRowId={(row) => row.id_pk}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoHeight autoWidth
                // checkboxSelection
                />
            </div>
        </>

    );
}
import React, { useEffect, useState } from 'react';
import './datatable.scss';

import { DataGrid } from '@mui/x-data-grid';
import { userColumns, productColumns } from '../../datatablesourse';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';



const Datatable = ({ type }) => {

    const [data, setData] = useState([]);
    const AdressStroke = window.location.href.split('/');
    const pageAdress = AdressStroke[AdressStroke.length - 1];

    useEffect(() => {
        const unsub = onSnapshot(collection(db, pageAdress), (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
        }, (error) => {
            console.log(error);
        })

        return () => {
            unsub();
        }

    }, [pageAdress]);

    const handleDelete = async (id) => {

        try {

            await deleteDoc(doc(db, pageAdress, id));
            setData(data.filter(item => item.id !== id));

        } catch (err) {
            console.log(err);
        }

    }

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {

                return (
                    <div className="cellAction">
                        {pageAdress === 'products'
                            ? <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                                Delete
                            </div>
                            : <>
                                <Link to={`/AdminPanel/users/${params.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="viewButton">
                                        View
                                    </div>
                                </Link>
                                <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                                    Delete
                                </div>
                            </>
                        }
                    </div>
                );
            }
        },
    ];

    return (
        <div className='datatable'>
            {pageAdress !== 'orders'
                ? <div className="datatableTitle">
                    Add New {pageAdress}
                    <Link to={`/AdminPanel/${pageAdress}/new`} className="link">Add New</Link>
                </div>
                : <div></div>
            }
            <DataGrid
                className='datagrid'
                rows={data}
                columns={pageAdress === 'products' ? productColumns.concat(actionColumn) : userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
import React, { useContext, useEffect, useState } from 'react';
import Chart from '../../components/chart/Chart';
import Sidebar from '../../components/sidebar/Sidebar';
import TableList from '../../components/table/Table';
import './single.scss';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth } from '../../firebase';

const Single = () => {
    const AdressStroke = window.location.href.split('/');
    const pageAdress = AdressStroke[AdressStroke.length - 1];

    const [data, setData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'users'), (snapShot) => {
            snapShot.docs.forEach(doc => {
                snapShot.docs.forEach(doc => {
                    if (doc.id === pageAdress) {
                        setData({ id: doc.id, ...doc.data() });
                    } else if (pageAdress === 'profile' && doc.data().email === JSON.parse(localStorage.getItem('user')).email) {
                        setData({ id: doc.id, ...doc.data() });
                    }
                });

            });

        }, (error) => {
            console.log(error);
        })

        return () => {
            unsub();
        }

    }, []);





    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src={data.img} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{data.displayName}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Adress:</span>
                                    <span className="itemValue">{data.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title='User Spending (Last 6 Months)' />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <TableList />
                </div>
            </div>
        </div>
    );
};

export default Single;
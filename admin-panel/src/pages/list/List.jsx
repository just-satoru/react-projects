import React from 'react';
import Datatable from '../../components/datatable/Datatable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.scss'


const List = () => {
    return (
        <div className='list'>
          <Sidebar />
          <div className="listContainer">
              <Datatable />
          </div>
        </div>
    );
};

export default List;
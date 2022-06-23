import React, { useState } from 'react';
import './item.scss';


const Item = ({ item, handleClick }) => {
    const [select, setSelect] = useState(false);


    return (
        <div
            className={select ? "portfolio__item select" : "portfolio__item add"}
            style={{ backgroundImage: `url(${item.src})` }}
            onClick={(e) => setSelect((p) => !p)}
            >

            <a onClick={handleClick}>{item.category}</a>
            <h2>{item.name}</h2>
        </div>
    );
};

export default Item;
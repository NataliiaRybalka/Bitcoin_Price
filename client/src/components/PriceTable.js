import React, { useState } from 'react';
import './PriceTable.css';

export default function PriceTable(props) {
  const [ignored, updateState] = useState();

  const { price } = props;

  const sortPrice = (param, direction) => {}

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <span className='up' onClick={()=>sortPrice('date', 'down')}>&uarr;</span>
              Дата
              <span className='down' onClick={()=>sortPrice('date', 'up')}>&darr;</span>
            </td>
            <td>
              <span className='up' onClick={()=>sortPrice('price', 'down')}>&uarr;</span>
              Цена
              <span className='down' onClick={()=>sortPrice('price', 'up')}>&darr;</span>
            </td>
          </tr>
        </thead>
        <tbody>
          {price.map(onePrice => (
            <tr key={onePrice._id}>
              <td>{onePrice.date}</td>
              <td>{onePrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

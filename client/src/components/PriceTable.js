import React, { useState, useCallback } from 'react';
import './PriceTable.css';

export default function PriceTable(props) {
  const [ignored, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const { price, limitsPrice } = props;
  
  const sortPrice = (param, direction) => {
    if (param === 'date') {
      if (direction === 'up') {
        price.sort((a, b) => {
          if (a.date > b.date) { 
            return -1; 
          }
          if (a.date < b.date) { 
            return 1; 
          }
          return 0;
        });
      } else if (direction === 'down') {
        price.sort((a, b) => {
          if (a.date < b.date) { 
            return -1; 
          }
          if (a.date > b.date) { 
            return 1; 
          }
          return 0;
        });
      }
    } else if (param === 'price') {
      if (direction === 'up') {
        price.sort((a, b) => b.price - a.price);
      } else if (direction === 'down') {
        price.sort((a, b) => a.price - b.price);
      }
    }

    forceUpdate();
  }

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
          {limitsPrice.map(onePrice => (
            <tr key={onePrice._id}>
              <td>{onePrice.date}</td>
              <td>{onePrice.price}</td>
            </tr>
          ))}
          {/* {price.map(onePrice => (
            <tr key={onePrice._id}>
              <td>{onePrice.date}</td>
              <td>{onePrice.price}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  )
}

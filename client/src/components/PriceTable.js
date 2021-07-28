import React from 'react';
import './PriceTable.css';

export default function PriceTable(props) {
  const { price, setSortParamAndDirection } = props;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <span className='up' onClick={()=>setSortParamAndDirection('date', 'largerTop')}>&uarr;</span>
              Дата
              <span className='down' onClick={()=>setSortParamAndDirection('date', 'smallerTop')}>&darr;</span>
            </td>
            <td>
              <span className='up' onClick={()=>setSortParamAndDirection('price', 'largerTop')}>&uarr;</span>
              Цена
              <span className='down' onClick={()=>setSortParamAndDirection('price', 'smallerTop')}>&darr;</span>
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

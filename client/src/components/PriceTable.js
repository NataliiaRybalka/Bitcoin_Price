import React from 'react';

export default function PriceTable(props) {
  const {price} = props;
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Дата</td>
            <td>Цена</td>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  )
}

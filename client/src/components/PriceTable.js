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

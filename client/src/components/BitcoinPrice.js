import React, { useState, useEffect } from 'react';
import './BitcoinPrice.css';
import { httpRequest } from '../services/http.service';

export default function BitcoinPrice() {
  const { request } = httpRequest();

  const getPage = async () => {
    const data = await request('/', 'GET');
    console.log(data);
  }

  useEffect(() => {
    getPage();
  });

  return (
    <div>
      <div id='selectInterval'>
        <h3>Интервал сканирования</h3>
        <select>
          <option value='1m'>1m</option>
          <option value='30m'>30m</option>
          <option value='1h'>1h</option>
          <option value='1d'>1d</option>
        </select>
      </div>
      
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

import React, { useState, useEffect } from 'react';
import './BitcoinPrice.css';
import { httpRequest } from '../herpers/http.helper';
import PriceTable from './PriceTable';

export default function BitcoinPrice() {
  const [interval, setInterval] = useState();
  const [price, setPrice] = useState([]);

  const { request } = httpRequest();

  const getPage = async () => {
    const data = await request();
    setPrice(data);
  }

  useEffect(() => {
    getPage();
  }, []);

  const onSelect = ({target: {value}}) => {
    setInterval(value);
  }
  
  const sendInterval = async () => {
    await request('http://localhost:3100/', 'POST', {interval});
  }

  useEffect(() => {
    sendInterval();
  }, [interval]);

  return (
    <div>
      <div id='selectInterval'>
        <h3>Интервал сканирования</h3>
        <select onChange={onSelect} value={interval}>
          <option value='1m'>1m</option>
          <option value='30m'>30m</option>
          <option value='1h'>1h</option>
          <option value='1d'>1d</option>
        </select>
      </div>
      
      <PriceTable price={price} />
    </div>
  )
}

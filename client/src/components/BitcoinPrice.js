import React, { useState, useEffect } from 'react';
import './BitcoinPrice.css';
import { httpRequest } from '../herpers/http.helper';
import PriceTable from './PriceTable';

export default function BitcoinPrice() {
  const { request } = httpRequest();

  const [interval, setInterval] = useState('1m');
  const [price, setPrice] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  const getPage = async () => {
    const data = await request();
    await setPrice(data);
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

  const arrayForButtons = [];
  for (let i = 0; i < 5; i++) {
    arrayForButtons.push(i + 1);
  }

  const changePage = (page) => {
    setSelectedPage(page);
  }

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

      {arrayForButtons.map(page => (
        <button onClick={() => changePage(page)} key={page}>{page}</button>
      ))}
    </div>
  )
}

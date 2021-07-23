import React, { useState, useEffect } from 'react';
import './BitcoinPrice.css';
import { httpRequest } from '../herpers/http.helper';
import PriceTable from './PriceTable';

export default function BitcoinPrice() {
  const [interval, setInterval] = useState('1m');
  const [price, setPrice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitsPrice, setLimitsPrice] = useState([]);

  const { request } = httpRequest();

  const getPage = async () => {
    const data = await request();
    await setPrice(data);
  }

  useEffect(() => {
    getPage();
  }, []);

  const limitToShow = 10;
  const totalPage = Math.ceil(price.length / limitToShow);
  const arrayOfPages = [];

  for (let i = 0; i < totalPage; i++) {
    arrayOfPages.push(i+1);
  }

  const selectPage = (page) => {
    setCurrentPage(page);
    fillingLimitsPrice();
  }

  const fillingLimitsPrice = () => {
    const indexOfLastRow = currentPage * limitToShow;
    const indexOfFirstRow = indexOfLastRow - limitToShow;
    const currentRows = price.slice(indexOfFirstRow, indexOfLastRow);
    setLimitsPrice(currentRows);
  }

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
      
      <PriceTable price={price} limitsPrice={limitsPrice} />

      {arrayOfPages.map(page => (
        <button key={page} onClick={() => selectPage(page)}>{page}</button>
      ))}
    </div>
  )
}

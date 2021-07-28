import React, { useState, useEffect } from 'react';
import './BitcoinPrice.css';
import { httpRequest } from '../herpers/http.helper';

export default function BitcoinPrice() {
  const { request } = httpRequest();

  const [interval, setInterval] = useState('1m');
  const [price, setPrice] = useState([]);
  const [pages, setPages] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortParam, setSortParam] = useState('dl');

  const getPage = async () => {
    const data = await request(`http://localhost:3101?sort=${sortParam}`);

    await setPrice(data.price);
    await setPages(data.totalPages);
  }

  useEffect(() => {
    getPage();
  }, []);

  const onSelect = ({target: {value}}) => {
    setInterval(value);
  }
  
  const sendInterval = async () => {
    await request('http://localhost:3101/', 'POST', {interval});
  }

  useEffect(() => {
    sendInterval();
  }, [interval]);

  const arrayForButtons = [];
  for (let i = 0; i < pages; i++) {
    arrayForButtons.push(i + 1);
  }

  const changePage = async (page) => {
    setSelectedPage(page);

    const data = await request(`http://localhost:3101?page=${page}&sort=${sortParam}`);
    await setPrice(data.price);
  }

  const setParam = (param, direction) => {
    if (param === 'date') {
      if (direction === 'largerTop') {
        setSortParam('dl');
      } else if (direction === 'smallerTop') {
        setSortParam('ds');
      }
    } else if (param === 'price') {
      if (direction === 'largerTop') {
        setSortParam('pl');
      } else if (direction === 'smallerTop') {
        setSortParam('ps');
      }
    }
  }

  const sortByParam = async () => {
    const data = await request(`http://localhost:3100?page=${selectedPage}&sort=${sortParam}`);
    await setPrice(data.price);
  };

  useEffect(() => {
    sortByParam();
  }, [sortParam]);

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
      
      <table>
        <thead>
          <tr>
            <td>
              <span className='up' onClick={()=>setParam('date', 'largerTop')}>&uarr;</span>
              Дата
              <span className='down' onClick={()=>setParam('date', 'smallerTop')}>&darr;</span>
            </td>
            <td>
              <span className='up' onClick={()=>setParam('price', 'largerTop')}>&uarr;</span>
              Цена
              <span className='down' onClick={()=>setParam('price', 'smallerTop')}>&darr;</span>
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

      {arrayForButtons.map(page => (
        <button onClick={() => changePage(page)} key={page}>{page}</button>
      ))}
    </div>
  )
}

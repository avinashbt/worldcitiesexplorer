// Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setData(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item => item.name.common.toLowerCase().includes(name.toLowerCase()));
    setFilteredData(filtered);

    console.log("object",filtered)
  }, [data, name]);

  return (
    <>
      <div className='header'>WORLD - CITY DETAILS</div>

      <div className='searchname'><input value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div className='container'>
        {filteredData.map((item, index) => (
            <div className='card' key={index}>
              <div> <span></span> <img src={item?.flags.png} width={"260px"} height={"200px"} alt=''/> </div>
            <div><span>Country Name:</span> {item.name.common}</div>
            <div> <span> Capital:</span> {item.capital}</div>
            <div> <span>Area: </span>  {item.area}</div>
            <div> <span>Population:</span> {item.population}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Header;

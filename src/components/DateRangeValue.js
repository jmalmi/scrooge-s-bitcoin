import React, { useEffect, useState } from 'react';
import { timestampToDate, formatValue, toDailyVolume } from './formats';
import Bearish from './Bearish';
import Chart from './Chart';
import Trade from './Trade';

function DateRangeValue() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
  
    const endDateFormat = Date.parse(endDate)/1000 + 3600 // 3600 adds 1h to endpoint

    useEffect(() => {
      fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${Date.parse(startDate)/1000}&to=${endDateFormat}}`)
        .then(result => result.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [isLoaded])

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoaded(!isLoaded);
    };


    function showData() {
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (data.length === 0 || data.total_volumes.length === 0) {
        return null;
      } else {
        const volumes = toDailyVolume(data);
        let max = { volume: volumes[0][1], date: volumes[0][0] };
        for (let i = 0; i < volumes.length; i++) {
          if (volumes[i][1] > max.volume) {
            max.volume = volumes[i][1];
            max.date = volumes[i][0];
          }
        }
        return (
            <div className='dateRangeContainer'>
              <div className='dateRangeText'>
                <p>
                  Highest volume was at {timestampToDate(max.date/1000)} <strong>{formatValue(max.volume.toFixed(2))}€</strong>
                </p>
                <Trade data={data}/>
                <Bearish data={data}/>
              </div> 
              <div>
                <Chart data={data}/>
              </div>
            </div>
        );
      } 
    }



  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form'>
        Starting day<br/>
        <input className="input" type="date" onChange={e=> setStartDate(e.target.value)}/><br/>
        Ending day<br/>
        <input className="input" type="date" onChange={e=> setEndDate(e.target.value)}/><br/>
        <input className="button" type="submit" value="GET BITCOIN DATA"></input>
      </form>
      <div>
        {showData()}
      </div>
    </div>
  )
}

export default DateRangeValue;

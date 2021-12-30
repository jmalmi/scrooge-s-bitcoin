import React, { useEffect, useState } from 'react';
import { timestampToDate, formatValue } from './formats';

// shows current data on header
function TodayValue() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true')
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (data.length === 0 || !isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div className='todayValue'>
            <ul>
              Last updated at: {timestampToDate(data.bitcoin.last_updated_at)}
            </ul>
            <ul>
              Current Value: {formatValue(data.bitcoin.eur.toFixed(2))}€
            </ul>
            <ul>
              Market Cap: {formatValue(data.bitcoin.eur_market_cap.toFixed(2))}€
            </ul>
            <ul>
              24h volume: {formatValue(data.bitcoin.eur_24h_vol.toFixed(2))}€
            </ul>
        </div>
    );
  }
}


export default TodayValue;

// Storing and exporting helping tools for components

export const dateValidate = (startDate, endDate, setError) => {
    if (!startDate && !endDate) {
        return setError(true);
    } else {
    return startDate, endDate
    }}


// formatting timestamp to normal time
export const timestampToDate = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp * 1000);
  const year = a.getFullYear();
  const month = a.getMonth()+1;
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const time = date + '.' + month + '.' + year + ' ';
  return time;
};

// formatting timestamp to utc time
export const formatUTC = (timestamp) => {
    let time = new Date(timestamp);
    let timeUtc = {
      year: time.getUTCFullYear(),
      month: time.getUTCMonth() + 1,
      date: time.getUTCDate(),
      hours: time.getUTCHours(),
      minutes: time.getUTCMinutes(),
      seconds: time.getUTCSeconds(),
    };
    return timeUtc;
  };

// data to daily volume data
export const toDailyVolume = (rawData) => {
  const data = rawData;
  let dailyVolume = [[data.total_volumes[0][0], data.total_volumes[0][1]]]
  let oneDay = formatUTC(data.total_volumes[0][0]).date
  for (let i = 1; i < data.total_volumes.length; i++) {
      let dayCounter = formatUTC(data.total_volumes[i][0]);
      if (dayCounter.date !== oneDay) {
        oneDay = dayCounter.date;
        dailyVolume.push(([data.total_volumes[i][0], data.total_volumes[i][1]]))
      }
    }
    return dailyVolume
  };

// data to daily price
export const toDailyPrice = (rawData) => {
  const data = rawData;
  let dailyPrice = [[data.prices[0][0], data.prices[0][1]]]
  let oneDay = formatUTC(data.prices[0][0]).date
  for (let i = 1; i < data.prices.length; i++) {
      let dayCounter = formatUTC(data.prices[i][0]);
      if (dayCounter.date !== oneDay) {
        oneDay = dayCounter.date;
        dailyPrice.push(([data.prices[i][0], data.prices[i][1]]))
      }
    }
    return dailyPrice
  };

export const formatValue = (value) => {
    return new Intl.NumberFormat().format(value)
};

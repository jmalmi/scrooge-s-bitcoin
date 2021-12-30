import { toDailyVolume } from './formats';

function Bearish({data}) {
  const prices = toDailyVolume(data)
  let firstPrice = prices[0][1]; // Setting first price
  let downDays = 0;
  let bearishDays = 0;
  for (let i = 1; i < prices.length; i++) { // Check if previous days price is higher than first price
      if (firstPrice >= prices[i][1]) {
      bearishDays++;
      firstPrice = prices[i][1]; // Checking if bearishDays is higher than previous high bearishDays
      if (bearishDays >= downDays) {
          downDays = bearishDays;
      }
      // Check if downward trend is ending
      } else if (firstPrice <= prices[i][1]) {
      if (bearishDays >= downDays) {
          downDays = bearishDays;
      }
      bearishDays = 0;
      firstPrice = prices[i][1];
      } else {
      if (bearishDays > downDays) {
          downDays = bearishDays;
          bearishDays = 0;
          firstPrice = prices[i][1];
      }
      }
  }
  return (
    <div className="bearish">
      <p>Longest downward trend was <strong>{downDays}</strong> days</p>
    </div>
  );
}
  
  export default Bearish
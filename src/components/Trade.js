import { toDailyPrice, timestampToDate, formatValue } from "./formats";

// finding trading days comparing price changes
function Trade({data}) {
    const prices = toDailyPrice(data);

    let decreasing = true;

    let min = { date: prices[0][0], price: prices[0][1] };
    let max = { date: prices[0][0], price: prices[0][1] };

    let difference = 0; // checking if price keeps decreasing and set true/false
    for (let i = 0; i < prices.length; i++) {
    if (i > 0) {
        if (prices[i][1] < prices[i - 1][1]) {
        decreasing = true;
        } else {
        decreasing = false;
        }
    }

    for (let j = i + 1; j < prices.length; j++) {
        if (prices[j][1] - prices[i][1] > difference) {
        difference = prices[j][1] - prices[i][1];
        min.date = prices[i][0];
        min.price = prices[i][1];
        max.date = prices[j][0];
        max.price = prices[j][1];
        }
    }
    }

    if (max.price > min.price) {
        return (
        <div className="trade">
            <p>Best day to buy at this period is {timestampToDate(min.date / 1000)} <strong>{formatValue(min.price.toFixed(2))}€</strong></p>
            <p>Best day to sell at this period is {timestampToDate(max.date / 1000)} <strong>{formatValue(max.price.toFixed(2))}€</strong></p>
        </div>)
        } else {
            return (
                <div className="trade">
                <p>You should not buy or sell at this period!</p>
            </div>)            
        }
    }
  
  export default Trade
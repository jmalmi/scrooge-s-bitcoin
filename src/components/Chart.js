import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { toDailyPrice ,timestampToDate } from './formats';

// Just little chart to help visualizing data
function Chart({data}) {
  const dataSet = toDailyPrice(data)
  const setData = []
  for (let i = 0; i < dataSet.length; i++) {
    setData.push({name: timestampToDate((dataSet[i][0]) / 1000), pv: dataSet[i][1]});
  }

  const renderLineChart = (
      <LineChart width={600} height={300} data={setData} >
        <Line type="monotone" dataKey='pv' stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    );

  return (
      <div className="chart">
        {renderLineChart}
      </div>
    );
  }
    
export default Chart 
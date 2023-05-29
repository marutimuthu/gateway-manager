import {
  BarChart,
  LineChart,
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Label,
  ReferenceLine,
  CartesianGrid,
  Area
} from 'recharts';
import './styles/index.scss';
import moment from 'moment';
import styles from './styles/dataChart.module.scss';
// import AxisLabel from './AxisLabel'

const DataChart = ({ responseData, currentTab, timePeriod }) => {
  console.log('responseData', responseData);

  let timeFormat = 'HH:ss';

  if (timePeriod === 'week' || timePeriod === 'month') {
    timeFormat = 'DMMM';
  }

  const output = responseData?.map((data) => ({
    ...data,
    time: moment(data?.timestamp).format(timeFormat)
  }));

  const labelStyle = {
    backgroundColor: 'black',
    color: 'white'
  };

  const itemStyle = {
    backgroundColor: 'black',
    color: 'white'
  };

  return (
    <div className="dataChartContainer">
      <ResponsiveContainer width="90%" height="90%">
        <LineChart data={output}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={50}>
            <Label value="time" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{ value: currentTab, angle: -90, position: 'insideLeft' }}
            dataKey={currentTab}
          />
          <Tooltip
            contentStyle={labelStyle}
            itemStyle={itemStyle}
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <ReferenceLine
            y={55}
            label="Max"
            stroke="red"
            strokeDasharray="5 5"
          />
          <ReferenceLine
            y={10}
            label="Min"
            stroke="red"
            strokeDasharray="5 5"
          />
          <Line
            dataKey={currentTab}
            fill="#8C7CF0"
            maxBarSize={20}
            legendType="circle"
            offset={20}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;

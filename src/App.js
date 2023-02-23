import logo from './logo.svg';
import './App.css';
import { VerticalBarChart } from './components/BarChart';
import { HorizontalBarChart } from './components/HorizontalChart';
import { VerticalBarChartNegative } from './components/VerticalBarChart';
import { LineChart } from './components/LineChart';
import { MultiSeriesLineChart } from './components/LineChartAdvanced';
import PieChart from './components/PieChart';


function App() {
  const data = [
    { month: 'January', value: 25 },
    { month: 'February', value: 30 },
    { month: 'March', value: 45 },
    { month: 'April', value: 60 },
    { month: 'May', value: 10 },
    { month: 'June', value: 65 },
    { month: 'July', value: 35 },
    { month: 'August', value: 50 },
  ];

  const dataNegative = [
    { month: 'January', value: -25 },
    { month: 'February', value: -30 },
    { month: 'March', value: 45 },
    { month: 'April', value: 60 },
    { month: 'May', value: 10 },
    { month: 'June', value: 65 },
    { month: 'July', value: 35 },
    { month: 'August', value: 50 },
  ];

  const dataMulti = [
    { "Date": "1/15/2016", "Data 1": "90", "Data 2": "135", "Data 3": "300", "Data 4": "95", "Data 5": "120", "Data 6": "310" },
    { "Date": "2/15/2016", "Data 1": "80", "Data 2": "150", "Data 3": "280", "Data 4": "100", "Data 5": "130", "Data 6": "300" },
    { "Date": "3/15/2016", "Data 1": "70", "Data 2": "165", "Data 3": "260", "Data 4": "105", "Data 5": "140", "Data 6": "290" },
    { "Date": "4/15/2016", "Data 1": "60", "Data 2": "180", "Data 3": "240", "Data 4": "110", "Data 5": "150", "Data 6": "280" },
    { "Date": "5/15/2016", "Data 1": "50", "Data 2": "195", "Data 3": "220", "Data 4": "115", "Data 5": "160", "Data 6": "270" },
    { "Date": "6/15/2016", "Data 1": "40", "Data 2": "210", "Data 3": "200", "Data 4": "120", "Data 5": "170", "Data 6": "260" },
    { "Date": "7/15/2016", "Data 1": "30", "Data 2": "225", "Data 3": "180", "Data 4": "125", "Data 5": "180", "Data 6": "250" },
    { "Date": "8/15/2016", "Data 1": "20", "Data 2": "240", "Data 3": "160", "Data 4": "130", "Data 5": "190", "Data 6": "240" },
  ];
  const width = 500;
  const height = 300;
  return (
    <div className="App">
      <h1>These charts were build by Atamurad Babakulyyev using VISX D3 library.</h1>
      <div className='flex ' >
        <VerticalBarChart data={data} width={width} height={height} />
        <HorizontalBarChart data={data} width={width} height={height} />
        <VerticalBarChartNegative data={dataNegative} width={width} height={height} />
        <LineChart data={data} width={width} height={height} />
        <MultiSeriesLineChart data={dataMulti} width={width} height={height} />
        <PieChart/>
      </div>
    </div>
  );
}

export default App;

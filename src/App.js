import './App.css'
import { MultiSeriesLineChart } from './components/LineChartAdvanced'
import LineChartDashed from './components/LineChartDashed'

import LineChartTooltip from './components/LineChartTooltip'

// const rangeValues = uniqueNumberValues.map(value => yMax - (value / Math.max(...uniqueNumberValues)) * yMax)
function App() {
  const data = [
    {
      Date: '4/15/2016',
      'Data 1': '330',
      'Data 2': '660'
    },
    {
      Date: '4/15/2017',
      'Data 1': '1240',
      'Data 2': '1630'
    },
    {
      Date: '4/15/2018',
      'Data 1': '344',
      'Data 2': '1630'
    },
    {
      Date: '4/15/2019',
      'Data 1': '44',
      'Data 2': '630'
    }
  ]
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '44px' }}>Category,Value Electronics,120 Books,80 Clothing,150 Groceries,200 Toys,90 Furniture,160</div>
}

export default App

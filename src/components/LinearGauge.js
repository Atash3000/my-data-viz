import React from 'react'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { AxisBottom } from '@visx/axis'
import { scaleLinear } from '@visx/scale'

const dataMulti = [
  { Date: '1/15/2016', 'Data 1': '90', 'Data 2': '135', 'Data 3': '300', 'Data 4': '95', 'Data 5': '120', 'Data 6': '310' },
  { Date: '2/15/2016', 'Data 1': '80', 'Data 2': '150', 'Data 3': '280', 'Data 4': '100', 'Data 5': '130', 'Data 6': '300' },
  { Date: '3/15/2016', 'Data 1': '70', 'Data 2': '165', 'Data 3': '260', 'Data 4': '105', 'Data 5': '140', 'Data 6': '290' },
  { Date: '4/15/2016', 'Data 1': '60', 'Data 2': '180', 'Data 3': '240', 'Data 4': '110', 'Data 5': '150', 'Data 6': '280' },
  { Date: '5/15/2016', 'Data 1': '50', 'Data 2': '195', 'Data 3': '220', 'Data 4': '115', 'Data 5': '160', 'Data 6': '270' },
  { Date: '6/15/2016', 'Data 1': '40', 'Data 2': '210', 'Data 3': '200', 'Data 4': '120', 'Data 5': '170', 'Data 6': '260' },
  { Date: '7/15/2016', 'Data 1': '30', 'Data 2': '225', 'Data 3': '180', 'Data 4': '125', 'Data 5': '180', 'Data 6': '250' },
  { Date: '8/15/2016', 'Data 1': '20', 'Data 2': '240', 'Data 3': '160', 'Data 4': '130', 'Data 5': '190', 'Data 6': '240' }
]
const dataKeys = Object.keys(dataMulti[0]).slice(1) // Exclude 'Date' key
const dataValues = dataMulti.map(row => dataKeys.map(key => Number(row[key])))
const flattenedData = dataValues.flat()
const maxValue = Math.max(...flattenedData)
const width = 800
const height = 90
const axisHeight = 20

const LinearGauge = () => {
  // Create the scale for the axis
  const xScale = scaleLinear({
    domain: [0, maxValue],
    range: [0, width]
  })

  // Calculate the filled width of each data segment
  const filledWidths = dataValues.map(row => row.map(value => (value / maxValue) * width))

  return (
    <svg width={width} height={height + axisHeight}>
      {filledWidths.map((row, rowIndex) => (
        <Group key={`gauge-row-${rowIndex}`}>
          {row.map((filledWidth, colIndex) => (
            <Bar key={`gauge-bar-${rowIndex}-${colIndex}`} x={colIndex === 0 ? 0 : row.slice(0, colIndex).reduce((a, b) => a + b, 0)} y={0} width={filledWidth} height={height} fill={`hsl(${(colIndex / dataKeys.length) * 360}, 60%, 60%)`} />
          ))}
        </Group>
      ))}
      <AxisBottom
        top={height}
        scale={xScale}
        numTicks={5}
        tickLength={5}
        tickLabelProps={() => ({
          fill: '#000',
          fontSize: 10,
          textAnchor: 'middle',
          dy: '0.33em'
        })}
      />
    </svg>
  )
}

export default LinearGauge

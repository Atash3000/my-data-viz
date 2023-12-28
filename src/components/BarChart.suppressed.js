import React from 'react'
import { Bar } from '@visx/shape'
import { scaleBand, scaleLinear, scaleOrdinal, scalePoint, scalePower, scaleTime } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'
function BarChartSuppressed() {
  const width = 1200
  const height = 600
  const data = [
    {
      value: '77',
      month: 'april'
    },
    {
      value: 'Hidden',
      month: 'january'
    },
    {
      value: 230,
      month: 'may'
    },
    {
      value: 'Masked',
      month: 'June'
    }
  ]

  const xScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, width],
    padding: 0.8
  })

  const yScaleLinear = scaleLinear({
    domain: [0, 250],
    range: [height, 0]
  })

  const yScaleOrdinal = scaleOrdinal({
    domain: ['Suppressed', 'Masked', 'Hidden', 'No data'],
    range: [height - 50, height - 50, height - 50, height - 50],
    unknown: height - 50
  })

  function yScaleDynamic(value) {
    if (['Suppressed', 'Masked', 'Hidden', 'No data'].includes(value)) {
      return yScaleOrdinal(value)
    } else {
      return yScaleLinear(value)
    }
  }

  return (
    <svg width={width} height={height + 55}>
      <g>
        {data.map(d => (
          <Bar
            fill={['Suppressed', 'Masked', 'Hidden', 'No data'].includes(d.value) ? 'red' : '#4f98ca'}
            key={d.month}
            x={xScale(d.month)}
            y={yScaleDynamic(d.value)}
            // y={['Suppressed', 'Masked', 'Hidden', 'No data'].includes(d.value) ? yScaleOrdinal(d.value) : yScaleLinear(d.value)}
            height={Math.abs(yScaleDynamic(d.value) - yScaleLinear(0))}
            width={xScale.bandwidth()}
          />
        ))}

        <AxisBottom left={0} tickLabelProps={() => ({ fontSize: '33px' })} scale={xScale} top={height} tickStroke='#333' stroke='#333' label='Month'></AxisBottom>

        {/* Add left axis */}
        <AxisLeft scale={yScaleLinear} label='Value' labelOffset={10} />
      </g>
    </svg>
  )
}

export default BarChartSuppressed

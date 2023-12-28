import React from 'react'
import { LinePath } from '@visx/shape'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'

function LineChartSuppressed() {
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
        <LinePath data={data} x={d => xScale(d.month) + xScale.bandwidth() / 2} y={d => yScaleDynamic(d.value)} stroke={d => (['Suppressed', 'Masked', 'Hidden', 'No data'].includes(d.value) ? 'red' : '#4f98ca')} />

        <AxisBottom left={0} tickLabelProps={() => ({ fontSize: '33px' })} scale={xScale} top={height} tickStroke='#333' stroke='#333' label='Month'></AxisBottom>

        <AxisLeft scale={yScaleLinear} label='Value' labelOffset={10} />
      </g>
    </svg>
  )
}

export default LineChartSuppressed

import React from 'react'
import { extent, max } from 'd3-array'
import { scaleLinear } from '@visx/scale'
import { LinePath } from '@visx/shape'
const LineChartDashed = ({ width, height, data }) => {
  // Define the margins
  const margin = { top: 20, bottom: 20, left: 30, right: 20 }

  // Define the scales
  const xScale = scaleLinear({
    range: [margin.left, width - margin.right],
    domain: extent(data, d => d['Date'])
  })

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, max(data, d => d['Data 1'])]
  })

  // Split data at y = 30
  const splitIndex = data.findIndex(d => d['Data 1'] === '44')
  const data1 = data.slice(0, splitIndex + 1) // Data for solid line
  const data2 = data.slice(splitIndex) // Data for dashed line

  return (
    <svg width={width} height={height}>
      {/* Solid Line */}
      <LinePath data={data1} x={d => xScale(d['Date'])} y={d => yScale(d['Data 1'])} stroke='black' strokeWidth={2} />

      {/* Dashed Line */}
      {data2.length > 1 && <LinePath data={data2} x={d => xScale(d['Date'])} y={d => yScale(d['Data 1'])} stroke='black' strokeWidth={2} strokeDasharray='5,5' />}
    </svg>
  )
}

export default LineChartDashed

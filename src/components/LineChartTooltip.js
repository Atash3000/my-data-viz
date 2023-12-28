import React, { useState } from 'react'

import { LinePath, Curve } from '@visx/shape'
import { Group } from '@visx/group'
import { scalePoint, scaleLinear, scaleTime } from '@visx/scale'
import { timeFormat } from 'd3-time-format'
import { localPoint } from '@visx/event'
import { bisector } from 'd3-array'
import { Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
const data = [
  { date: '2023', value: 50 },
  { date: '2024', value: 10 },
  { date: '2029', value: 20 }
  // ... more data
]
const LineChartTooltip = () => {
  const [tooltipData, setTooltipData] = useState(null)
  const [tooltipTop, setTooltipTop] = useState(0)
  const [tooltipLeft, setTooltipLeft] = useState(0)

  // Define margins
  const bisectDate = bisector(d => d.date).left
  const shouldFormat = true
  const width = 500
  const height = 300
  const margin = { top: 20, bottom: 20, left: 20, right: 20 }
  const formatDate = dateStr => {
    const format = shouldFormat ? '%Y' : '%Y-%m-%d' // Change format here
    const parser = timeFormat(format)
    return parser(new Date(dateStr))
  }
  // Define scales
  const xScale = scalePoint({
    domain: data.map(d => (shouldFormat ? formatDate(d.date) : d.date)),
    range: [margin.left, width - margin.right]
  })
  const xScaleTime = scaleTime({
    domain: [new Date(data[0].date), new Date(data[data.length - 1].date)],
    range: [margin.left, width - margin.right]
  })

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    range: [height - margin.bottom, margin.top]
  })
  const handleMouseMove = event => {
    const { x } = localPoint(event) || { x: 0 }
    const x0 = xScaleTime.invert(x)
    const index = bisectDate(data, x0, 1)
    const d0 = data[index - 1]
    const d1 = data[index]
    let d = d0
    if (d1 && d1.date) {
      d = x0 - d0.date > d1.date - x0 ? d1 : d0
    }
    setTooltipData(d)
    setTooltipTop(yScale(d.value))
    setTooltipLeft(xScale(d.date))
  }
  return (
    <div>
      <svg width={width} height={height}>
        <Group>
          <LinePath data={data} x={d => xScale(shouldFormat ? formatDate(d.date) : d.date)} y={d => yScale(d.value)} stroke='#000' strokeWidth={2} />
          <LinePath onMouseMove={event => handleMouseMove(event, data)} data={data} x={d => xScaleTime(shouldFormat ? formatDate(d.date) : d.date)} y={d => yScale(d.value)} stroke='#000' strokeWidth={20} />
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={defaultStyles}>
          Value: {tooltipData.value}
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default LineChartTooltip

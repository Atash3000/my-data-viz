import React, { useState } from 'react'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { scaleTime, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { extent, max } from 'd3-array'
import { LinePath } from '@visx/shape'
import { Text } from '@visx/text'
import { Tooltip as ReactTooltip } from 'react-tooltip'
// Sample data
const data = [
  { month: 'January', value: 25, price: 33 },
  { month: 'February', value: 30, price: 23 },
  { month: 'March', value: 45, price: 93 },
  { month: 'April', value: 60, price: 13 },
  { month: 'May', value: 10, price: 12 },
  { month: 'June', value: 65, price: 33 },
  { month: 'July', value: 35, price: 43 },
  { month: 'August', value: 50, price: 53 }
]

// Accessors
const x = d => new Date(`${d.month}, 2023`)
const y = d => d.value

// Dimensions
const width = 500
const height = 300
const margin = { top: 20, bottom: 20, left: 50, right: 20 }

function LineChart() {
  const [tooltipContent, setTooltipContent] = useState('')
  // Scales
  const xScale = scaleTime({
    range: [margin.left, width - margin.right],
    domain: extent(data, x)
  })

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, max(data, y)]
  })
  const [hoveredValue, setHoveredValue] = useState(null)
  // Tooltip handler
  // const handleTooltip = (event, d) => {
  //   const { clientX, clientY } = event
  //   const xPos = clientX - margin.left
  //   const yPos = clientY - margin.top
  //   setHoveredValue({ value: y(d), x: xPos, y: yPos })
  // }
  const handleTooltip = d => {
    setTooltipContent(`Value: ${y(d)}`)
  }

  const handleMouseOut = () => {
    setHoveredValue(null)
  }
  console.log(tooltipContent, 'tooltipContent')
  return (
    <div>
      <ReactTooltip id='chartTooltip' effect='#333'>
        {tooltipContent}
      </ReactTooltip>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <LinePath data={data} x={d => xScale(x(d))} y={d => yScale(y(d))} stroke='#333' strokeWidth={2} />
          {/* {data.map((d, i) => (
            <circle key={i} cx={xScale(x(d))} cy={yScale(y(d))} r={4} fill='blue' onMouseOver={e => handleTooltip(e, d)} />
          ))} */}
          <AxisLeft scale={yScale} />
          <AxisBottom top={height - margin.bottom} scale={xScale} />
          {/* {hoveredValue && (
          <Text x={hoveredValue.x} y={hoveredValue.y} dx={10} dy={-10} fontSize={12} fill='black' textAnchor='start'>
            {hoveredValue.value}
          </Text>
        )} */}

          {data.map((d, i) => {
            return <circle key={i} cx={xScale(x(d))} cy={yScale(y(d))} r={4} fill='red' data-tip data-for='chartTooltip' onMouseOver={() => handleTooltip(d)} />
          })}
        </Group>
      </svg>
      <ReactTooltip id='chartTooltip' effect='#333'>
        {tooltipContent}
      </ReactTooltip>
    </div>
  )
}

export default LineChart

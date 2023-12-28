import React from 'react'
import { Bar } from '@visx/shape'
import { scaleOrdinal, scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'

function BarChartOrdinal() {
  const width = 600
  const height = 600
  const data = [
    { fruit: 'apple', count: '44' },
    { fruit: 'banana', count: '333' },
    { fruit: 'cherry', count: 'K' }
  ]
  const colorScale = scaleOrdinal({
    domain: data.map(d => d.count), // Define the unique values here
    range: data.map(d => (!isNaN(d.count) ? 'red' : 'blue')) // Define corresponding colors here
  })
  //   const xScale = scaleOrdinal({
  //     domain: data.map(d => d.fruit),
  //     range: data.map(d => d.count),
  //     unknown: 400
  //   })

  const xScale = scaleBand({
    domain: data.map(d => d.fruit),
    range: [0, width],
    padding: 0.8
  })
  // const getColorScale = barColor => {
  //   const calculableRadiusValues = tableData
  //     .filter(d => !Number.isNaN(Number(d.Radius))) // Filter the calculable Radius values
  //     .map(d => d.Radius) // Map to extract only the Radius values
  //   return scaleOrdinal({
  //     domain: calculableRadiusValues,
  //     range: [barColor],
  //     unknown: '#ddd'
  //   })
  // }

  const yScale = scaleOrdinal({
    domain: data.map(d => d.count),
    // range: [600 - 50, 600 - 100, height - 900],
    range: data.map(d => (!isNaN(d.count) ? height - d.count : height - 25))
  })

  const yScaleLinear = scaleLinear({
    domain: [0, 500],
    range: [height, 0]
  })

  return (
    <svg width={width} height={height + 55}>
      <g>
        {data.map(d => (
          <Bar fill={colorScale(d.count)} key={d.fruit} x={xScale(d.fruit)} y={yScale(d.count)} height={height - yScale(d.count)} width={xScale.bandwidth()} />
        ))}

        <AxisBottom scale={xScale} top={height} />
        <AxisLeft strokeWidth={'3'} scale={yScale} />
      </g>
    </svg>
  )
}

export default BarChartOrdinal

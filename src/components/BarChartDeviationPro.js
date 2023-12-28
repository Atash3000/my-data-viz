import React from 'react'
import { Bar, Line } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'

export const BarChartPRO = ({ data, width, height, margin, target, orientation = 'vertical' }) => {
  const isVertical = orientation === 'vertical'

  // Define the scales
  const primaryScale = scaleBand({
    domain: data.map(d => d.month),
    range: isVertical ? [margin.top, height - margin.bottom] : [margin.left, width - margin.right],
    padding: 0.4
  })

  const minValue = Math.min(...data.map(d => d.value))
  const maxValue = Math.max(...data.map(d => d.value))
  const secondaryScale = scaleLinear({
    domain: [minValue * 1.05, maxValue * 1.05],
    range: isVertical ? [height - margin.bottom, margin.top] : [margin.left, width - margin.right]
  })

  // Calculate target position
  const targetPos = isVertical ? Math.min(Math.max(secondaryScale(target), margin.top), height - margin.bottom) : Math.min(Math.max(primaryScale(target), margin.left), width - margin.right)

  // Render the chart
  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const barPosition = d.value > target ? 'positive' : 'negative'
          const barColor = { positive: 'steelblue', negative: 'crimson' }
          const barPrimary = primaryScale(d.month)
          const barSecondary = secondaryScale(d.value)
          const barLength = Math.abs(targetPos - barSecondary)

          const x = isVertical ? barPrimary : barPosition === 'positive' ? targetPos : targetPos - barLength
          const y = isVertical ? (barPosition === 'positive' ? barSecondary : targetPos) : barPrimary
          const barWidth = isVertical ? primaryScale.bandwidth() : barLength
          const barHeight = isVertical ? barLength : primaryScale.bandwidth()

          return <Bar key={`bar-${i}`} x={x} y={y} width={barWidth} height={barHeight} fill={barColor[barPosition]} />
        })}
        <Line from={isVertical ? { x: margin.left, y: targetPos } : { x: targetPos, y: margin.top }} to={isVertical ? { x: width - margin.right, y: targetPos } : { x: targetPos, y: height - margin.bottom }} stroke='#333' strokeWidth={1} />
      </Group>
      {isVertical ? (
        <>
          <AxisBottom top={height - margin.bottom} scale={primaryScale} />
          <AxisLeft left={margin.left} scale={secondaryScale} />
        </>
      ) : (
        <>
          <AxisBottom top={height - margin.bottom} scale={secondaryScale} />
          <AxisLeft left={margin.left} scale={primaryScale} />
        </>
      )}
    </svg>
  )
}

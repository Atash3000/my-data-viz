import { Bar, Line } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { Fragment } from 'react'
export const DeviatedBarVaetical = ({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 }, target = 1000 }) => {
  // Define the scales
  // Define the scales
  const xScale = scaleBand({
    domain: data.map(d => d.month),
    range: [margin.left, width - margin.right],
    padding: 0.4
  })

  const minValue = Math.min(...data.map(d => d.value))
  const maxValue = Math.max(...data.map(d => d.value))
  const yScale = scaleLinear({
    domain: [minValue < 0 ? minValue * 1.05 : 0, maxValue * 1.05],
    range: [height - margin.bottom, margin.top]
  })
  // Calculate target position
  // Calculate target position
  // Calculate target position
  const targetY = Math.min(Math.max(yScale(target), margin.top), height - margin.bottom)
  const lollipopSize = 'large'
  const isLollipopChart = true
  const lollipopBarWidth = lollipopSize === 'large' ? 7 : lollipopSize === 'medium' ? 6 : 5
  const barWidth = isLollipopChart ? lollipopBarWidth : 30
  const lollipopShapeSize = lollipopSize === 'large' ? 14 : lollipopSize === 'medium' ? 12 : 10

  // Render the chart
  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const barPosition = d.value > target ? 'top' : 'bottom'
          const barY = d.value > target ? yScale(d.value) : targetY
          const barX = xScale(d.month)
          const barColor = { top: 'steelblue', bottom: 'crimson' }
          const barHeight = Math.abs(targetY - yScale(d.value))
          const lollipopCircleX = barX + barWidth / 2
          const lollipopCircleY = barPosition === 'top' ? yScale(d.value) : targetY + barHeight

          return (
            <Fragment key={`bar-${i}`}>
              <Bar x={barX} y={barY} width={barWidth} height={barHeight} fill={barColor[barPosition]} />
              {isLollipopChart && <circle cx={lollipopCircleX} cy={lollipopCircleY} r={lollipopShapeSize / 2} fill={barColor[barPosition]} style={{ filter: 'unset', opacity: 1 }} />}
            </Fragment>
          )
        })}
        {/* <Line from={{ x: margin.left, y: yScale(0) }} to={{ x: width - margin.right, y: yScale(0) }} stroke='#333' strokeWidth={1} /> */}
        <Line from={{ x: margin.left, y: targetY }} to={{ x: width - margin.right, y: targetY }} stroke='#333' strokeWidth={1} />
      </Group>
      <AxisBottom top={height - margin.bottom} scale={xScale} />
      <AxisLeft left={margin.left} scale={yScale} />
    </svg>
  )
}

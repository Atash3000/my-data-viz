import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'

export function HorizontalBarChartNegative({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2
  })

  const xScale = scaleLinear({
    domain: [Math.min(0, ...data.map(d => d.value * 1.05)), Math.max(0, ...data.map(d => d.value))],
    range: [0, width]
  })

  const zeroX = xScale(0)

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => {
          const barWidth = Math.abs(xScale(d.value) - zeroX)
          const barX = d.value >= 0 ? zeroX : xScale(d.value)
          const barY = yScale(d.month)

          return (
            <g key={d.month}>
              <Bar x={barX} y={barY} width={barWidth} height={yScale.bandwidth()} fill={d.value >= 0 ? '#AD7BE9' : '#FD841F'} />
              <Text x={barX} y={yScale(d.month) + 12} fill='#fff' verticalAnchor='start'>
                {d.value}
              </Text>
            </g>
          )
        })}

        <Line from={{ x: zeroX, y: 0 }} to={{ x: zeroX, y: height }} stroke='#000' strokeWidth={1} />

        <AxisLeft scale={yScale} label='Month' labelOffset={10} />

        <AxisBottom scale={xScale} top={height} label='Value' labelOffset={10} />
      </g>
    </svg>
  )
}

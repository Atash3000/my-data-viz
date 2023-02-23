import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'

export function DeviatedBarChart3({ data, width, height, target = 100, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  const minVal = Math.min(0, ...data.map(d => d.value * 1.03))
  const maxVal = Math.max(target, ...data.map(d => d.value))

  const hasNegativeValues = data.some(d => d.value < 0)
  const shouldShowTargetLine = hasNegativeValues || target > 0

  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2
  })

  const xScale = scaleLinear({
    domain: [minVal, maxVal],
    range: [0, width]
  })

  const targetX = xScale(target)

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => {
          const barWidth = Math.abs(xScale(d.value) - targetX)
          const barX = d.value >= target ? targetX : xScale(d.value)
          const barY = yScale(d.month)
          const textX = d.value >= target ? barX + barWidth + 5 : barX - 5
          const textAnchor = d.value >= target ? 'start' : 'end'
          const textColor = d.value < 0 ? '#fff' : '#000'

          return (
            <g key={d.month}>
              <Bar x={barX} y={barY} width={barWidth} height={yScale.bandwidth()} fill={d.value >= target ? '#EB455F' : '#58287F'} />
              {/* <Text x={textX} y={barY + yScale.bandwidth() / 2} fill={textColor} verticalAnchor='middle' textAnchor={textAnchor}>
                {d.value < 0 ? `-${Math.abs(d.value)}` : d.value}
              </Text> */}
            </g>
          )
        })}

        {shouldShowTargetLine && <Line from={{ x: targetX, y: 0 }} to={{ x: targetX, y: height }} stroke='#000' strokeWidth={2} />}

        <AxisLeft scale={yScale} label='Month' labelOffset={10} />

        <AxisBottom scale={xScale} top={height} label='Value' labelOffset={10} />
      </g>
    </svg>
  )
}

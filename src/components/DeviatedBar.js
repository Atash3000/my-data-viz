import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'

export function DeviatedBarChart({ data, width, height, target = 100, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Define the scales for the x and y axes
  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2
  })
  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    range: [0, width]
  })
  // Check that the target value is within the domain of the x scale
  const targetX = Math.min(xScale(target), xScale.range()[1])
  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Add the bars */}
        {data.map(d => (
          <>
            <foreignObject key={d.month} x={d.value > target ? xScale(target) : 0} y={yScale(d.month)} width={xScale(d.value)} data-tooltip={'sdfknsdlfk'} height={yScale.bandwidth()} style={{ backgroundColor: d.value > target ? '#2DCDDF' : '#03C988' }} />
            <Text x={d.value > target ? xScale(target + 3) : 0} y={yScale(d.month) + 12} fill='#fff' verticalAnchor='start'>
              {d.value < 0 ? `-${d.value}` : d.value}
            </Text>
          </>
        ))}

        {/* Add the target line */}
        {target && target > 0 && <Line from={{ x: targetX, y: 0 }} to={{ x: targetX, y: height }} stroke='black' strokeWidth={2} />}

        {/* Add left axis */}
        <AxisLeft scale={yScale} label='Month' labelOffset={10} />

        {/* Add bottom axis */}
        <AxisBottom scale={xScale} top={height} label='Value' labelOffset={10} />
      </g>
    </svg>
  )
}

import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'

export function DeviatedBarChart2({ data, width, height, target = 100, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Calculate the minimum and maximum values in the data
  const minValue = Math.min(...data.map(d => d.value))
  const maxValue = Math.max(...data.map(d => d.value))

  // Define the scales for the x and y axes
  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2
  })
  const xScale = scaleLinear({
    domain: [Math.min(0, minValue * 1.03), Math.max(0, maxValue)],
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
            <foreignObject key={d.month} x={d.value > target ? targetX : xScale(d.value)} y={yScale(d.month)} width={Math.abs(xScale(d.value) - targetX)} height={yScale.bandwidth()} style={{ backgroundColor: d.value > target ? '#2DCDDF' : '#03C988' }} />
            <Text x={d.value > target ? targetX + 5 : xScale(d.value) - 5} y={yScale(d.month) + 12} fill='#fff' verticalAnchor='start'>
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

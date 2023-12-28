import { Bar, Line } from '@visx/shape'
import { scaleLinear, scaleBand, scaleLog } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'

export function DeviatedBarChart3({ data, width, height, target = 100, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  const minVal = Math.min(0, ...data.map(d => d.value * 1.03))
  const maxVal = Math.max(...data.map(d => d.value))
  const isVertical = true

  const hasNegativeValues = data.some(d => d.value < 0)
  const shouldShowTargetLine = hasNegativeValues || target > 0

  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2
  })
  // console.log('maxVal', maxVal)
  // const xScale = scaleLog({
  //   domain: [10, maxVal],
  //   range: [0, width],
  //   base: 10,
  //   zero: true
  // })
  const xScale = scaleLinear({
    domain: [minVal, maxVal],
    range: [0, width]
  })

  const targetX = Math.max(xScale(0), Math.min(xScale(target), xScale(maxVal)))
  const applyRadius = barPosition => {
    let style = {}
    if (barPosition === 'left') {
      style = { borderRadius: ' 8px 0 0 8px   ' }
    } else {
      style = { borderRadius: ' 0  8px  8px 0  ' }
    }
    return style
  }
  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <Group transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d, index) => {
          const barWidth = Math.abs(xScale(d.value) - targetX)
          const barX = d.value >= target ? targetX : xScale(d.value)
          const barY = yScale(d.month)
          const barPosition = d.value < target ? 'left' : 'right'
          const style = applyRadius(barPosition)

          return (
            <g key={d.month}>
              <foreignObject x={barX} y={barY} width={barWidth} height={yScale.bandwidth()} style={{ background: d.value >= target ? '#EB455F' : '#58287F', ...style }}></foreignObject>
            </g>
          )
        })}

        {shouldShowTargetLine && <Line from={{ x: targetX, y: 0 }} to={{ x: targetX, y: height }} stroke='#333' strokeWidth={1} />}
        <AxisLeft scale={yScale} label='Month' labelOffset={10} />
        <AxisBottom scale={xScale} top={height} label='Value' labelOffset={10} />
      </Group>
    </svg>
  )
}

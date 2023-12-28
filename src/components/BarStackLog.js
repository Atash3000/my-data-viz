import { Bar, Line } from '@visx/shape'
import { scaleLog, scaleBand, scalePoint, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { Text } from '@visx/text'

const data = [
  { month: 'January', value: 3300000000 },
  { month: 'February', value: 30 },
  { month: 'March', value: 45 },
  { month: 'April', value: 60 },
  { month: 'May', value: 10 },
  { month: 'June', value: 65 },
  { month: 'July', value: 35 },
  { month: 'August', value: 50 }
]

export const HorizBarChartLogScale = ({ width, height }) => {
  let margin = { top: 20, right: 20, bottom: 60, left: 60 }
  const minVal = Math.min(1, ...data.map(d => d.value))
  const maxVal = Math.max(...data.map(d => d.value))
  const useLogaritmiccScale = true
  let xScale = scaleLinear({
    domain: [minVal, maxVal],
    range: [0, 122]
  })

  if (useLogaritmiccScale) {
    xScale = scaleLog({
      domain: [minVal, maxVal],
      range: [margin.left, width - margin.right],
      zero: true
    })
  }

  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height]
  })
  let totalheight = (25 + 15) * 4

  return (
    <svg width={width} height={height}>
      <Group transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d, index) => {
          let barHeight = 25
          let barSpace = 15
          let barX = useLogaritmiccScale ? xScale(1) : xScale(d.month)
          let barWidth = useLogaritmiccScale ? xScale(d.value) - xScale(1) : xScale(d.value)
          let barY = yScale(d.month)
          // update bar Y to give dynamic Y when user applyes BarSpace
          let y = 0
          y = index !== 0 ? (barSpace + barHeight) * index : y

          return <Bar key={d.label} x={barX} y={barY} width={barWidth} height={25} fill='#4f98ca' />
        })}
        <AxisBottom scale={xScale} top={height} label='Value' labelOffset={10} />
        {/* <AxisLeft scale={yScale} label='Month' top={0} left={0} labelOffset={20} /> */}
      </Group>
    </svg>
  )
}

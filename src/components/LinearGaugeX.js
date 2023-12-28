import React from 'react'
import { Bar } from '@visx/shape'
import { scaleLinear } from '@visx/scale'

const LinearGauge = ({ value, min, max, width }) => {
  const scale = scaleLinear({ domain: [min, max], range: [0, width] })
  const scaledValue = scale(value)

  return (
    <svg width={width} height='30'>
      <Bar x={0} y={10} width={width} height={10} fill='#ccc' />
      <Bar x={0} y={10} width={scaledValue} height={10} fill='#007bff' />
    </svg>
  )
}

export default LinearGauge

import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

export function HorizontalBarChart({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Define the scales for the x and y axes
  const yScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, height],
    padding: 0.2,
  });
  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    range: [0, width],
  });

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => (
          <Bar
            key={d.month}
            x={0}
            y={yScale(d.month)}
            width={xScale(d.value)}
            height={yScale.bandwidth()}
            fill="#AD7BE9"
          />
        ))}

        {/* Add left axis */}
        <AxisLeft
          scale={yScale}
          label="Month"
          labelOffset={10}
        />

        {/* Add bottom axis */}
        <AxisBottom
          scale={xScale}
          top={height}
          label="Value"
          labelOffset={10}
        />
      </g>
    </svg>
  );
}

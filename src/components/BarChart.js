import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

export function VerticalBarChart({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Define the scales for the x and y axes
  const xScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, width],
    padding: 0.2,
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.value))],
    range: [height, 0],
  });

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => (
          <Bar
            key={d.month}
            x={xScale(d.month)}
            y={yScale(d.value)}
            height={height - yScale(d.value)}
            width={xScale.bandwidth()}
            fill="#00b0ff"
          />
        ))}

        {/* Add left axis */}
        <AxisLeft
          scale={yScale}
          label="Value"
          labelOffset={10}
          tickFormat={(value) => `$${value}`}
        />

        {/* Add bottom axis */}
        <AxisBottom
          scale={xScale}
          top={height}
          label="Month"
          labelOffset={10}
        />
      </g>
    </svg>
  );
}

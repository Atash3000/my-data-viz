import { LinePath } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

export function LineChart({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
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
        {/* Add line */}
        <LinePath
          data={data}
          x={d => xScale(d.month) + xScale.bandwidth() / 2}
          y={d => yScale(d.value)}
          stroke="#EB455F"
          strokeWidth={2}
          strokeOpacity={1}
          shapeRendering="geometricPrecision"
        />

        {/* Add bottom axis */}
        <AxisBottom
          scale={xScale}
          top={height}
          label="Month"
          labelOffset={10}
        />

        {/* Add left axis */}
        <AxisLeft
          scale={yScale}
          label="Value"
          labelOffset={10}
        />
      </g>
    </svg>
  );
}

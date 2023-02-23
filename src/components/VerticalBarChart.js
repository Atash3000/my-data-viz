import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Line } from '@visx/shape';

export function VerticalBarChartNegative({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Define the scales for the x and y axes
  const xScale = scaleBand({
    domain: data.map(d => d.month),
    range: [0, width],
    padding: 0.2,
  });
  const yScale = scaleLinear({
    domain: [Math.min(...data.map(d => d.value)), Math.max(...data.map(d => d.value))],
    range: [height, 0],
  });

  const hasNegativeValues = data.some(d => d.value < 0);

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Add bars */}
        {data.map(d => (
          <Bar
            key={d.month}
            x={xScale(d.month)}
            y={d.value >= 0 ? yScale(d.value) : yScale(0)}
            height={Math.abs(yScale(d.value) - yScale(0))}
            width={xScale.bandwidth()}
            fill="#E96479"
          />
        ))}

        {/* Add x-axis line for negative values */}
        {hasNegativeValues && (
          <Line
            from={{ x: xScale(data[0].month), y: yScale(0) }}
            to={{ x: xScale(data[data.length - 1].month) + xScale.bandwidth(), y: yScale(0) }}
            stroke="#333"
          />
        )}

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

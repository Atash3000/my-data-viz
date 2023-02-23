import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { extent, max } from 'd3-array';

export function MultiSeriesLineChart({ data, width, height, margin = { top: 20, right: 20, bottom: 60, left: 60 } }) {
  // Extract the series keys from the data
  const seriesKeys = Object.keys(data[0]).filter(key => key !== 'Date');

  // Define the scales for the x and y axes
  const xScale = scaleTime({
    domain: extent(data, d => new Date(d.Date)),
    range: [0, width],
  });
  const yScale = scaleLinear({
    domain: [0, max(data, d => max(seriesKeys, key => Number(d[key])))],
    range: [height, 0],
  });

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Add lines for each series */}
        {seriesKeys.map((key, i) => (
          <LinePath
            key={key}
            data={data}
            x={d => xScale(new Date(d.Date))}
            y={d => yScale(Number(d[key]))}
            stroke={`hsl(${i * 30}, 70%, 50%)`}
            strokeWidth={2}
            strokeOpacity={1}
            shapeRendering="geometricPrecision"
          />
        ))}

        {/* Add bottom axis */}
        <AxisBottom
          scale={xScale}
          top={height}
          label="Date"
          labelOffset={10}
          tickFormat={(value) => new Date(value).toLocaleDateString()}
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

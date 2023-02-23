import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";
import * as d3 from "d3";

const data = [
  { label: "Apples", value: 10 },
  { label: "Oranges", value: 20 },
  { label: "Bananas", value: 30 },
  { label: "Peaches", value: 15 },
  { label: "Grapes", value: 25 }
];

const width = 500;
const height = 300;

const radius = Math.min(width, height) / 2;
const centerY = height / 2;
const centerX = width / 2;

const pieArc = d3.pie()
  .sort(null)
  .value(d => d.value)(data);

const arcPath = d3.arc()
  .outerRadius(radius)
  .innerRadius(0);

const PieChart = () => (
  <svg width={width} height={height}>
    <GradientPinkBlue id="pieGradient" />
    <Group top={centerY} left={centerX}>
      <Pie
        data={pieArc}
        pieValue={d => d.value}
        outerRadius={radius}
        innerRadius={0}
      >
        {pie => {
          return pie.arcs.map((arc, index) => {
            return (
              <g key={`arc-${index}`}>
                <path d={arcPath(arc)} fill={`url(#pieGradient)`} />
               
              </g>
            );
          });
        }}
      </Pie>
    </Group>
  </svg>
);

export default PieChart;

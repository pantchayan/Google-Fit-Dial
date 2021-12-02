let values = [{ steps: 5000 }];
let goal = 10000;

let dims = { height: 300, width: 300 };
let center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };



let svg = d3
  .select(".c")
  .append("svg")
  .attr("height", dims.height)
  .attr("width", dims.width);

let bgwheels = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let stepsWheel = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pointsWheel = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pie = d3
  .pie()
  .sort(null)
  .value((d) => d);

let stepsPie = d3
  .pie()
  .sort(null)
  .value((d) => d.steps);

let pointsPie = d3
  .pie()
  .sort(null)
  .value((d) => d.points);

let arcOuter = d3.arc().outerRadius(115).innerRadius(105).cornerRadius(20);
let arcInner = d3.arc().outerRadius(95).innerRadius(85).cornerRadius(20);

let buildBgWheels = () => {
  let paths = bgwheels.selectAll("path").data(pie([1]));

  paths
    .enter()
    .append("path")
    .attr("d", (d) => arcOuter(d))
    .attr("fill", "#00b359")
    .attr("opacity", 0.3);

  paths
    .enter()
    .append("path")
    .attr("d", (d) => arcInner(d))
    .attr("fill", "#00005a")
    .attr("opacity", 0.2);
};

let buildStepsWheel = () => {
  // remaining // done
  let currData = [
    { type: "done", steps: values[0].steps },
    { type: "remaining", steps: goal - values[0].steps },
  ];

  let paths = stepsWheel.selectAll("path").data(stepsPie(currData));

  paths
    .enter()
    .append("path")
    // .attr("d", (d) => arcInner(d))
    .attr("opacity", (d) => {
      if (d.data.type == "remaining") return 0;
      return 1;
    })
    .attr("fill", "#00005a")
    .transition()
    .duration(1000)
    .attrTween('d', d => enterTweenInner(d));
};

let buildPointsWheel = () => {
  let perc = (values[0].steps / goal) * 100 + 10;

  let currData = [
    { type: "done", points: perc },
    { type: "remaining", points: 100 - perc },
  ];

  let paths = pointsWheel.selectAll("path").data(pointsPie(currData));

  paths
    .enter()
    .append("path")
    // .attr("d", (d) => arcOuter(d))
    .attr("opacity", (d) => {
      if (d.data.type == "remaining") return 0;
      return 1;
    })
    .attr('fill', '#00b359')
    .transition()
    .duration(1000)
    .attrTween('d', d => enterTweenOuter(d));
};

let enterTweenOuter = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle)

  return function(t) {
    d.endAngle = i(t)
    return arcOuter(d)
  }
}

let enterTweenInner = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle)

  return function(t) {
    d.endAngle = i(t)
    return arcInner(d)
  }
}

buildBgWheels();
buildStepsWheel();
buildPointsWheel();

let stepsCounter = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`)
  .attr("class", "steps-counter");

let pointsCounter = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`)
  .attr("class", "points-counter");

let buildStepsCounter = () => {
  let texts = stepsCounter.selectAll("text").data([values[0].steps]);

  texts
    .enter()
    .append("text")
    // .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("fill", "#00005a")
    .attr("transform", "translate(0, 35)")
    .attr("font-size", 25)
    .attr("font-weight", 550)
    .transition()
    .duration(1000)
    .tween('text', d => counterTween(d));
};

let buildPointsCounter = () => {
  // points ?
  let points = Math.round((values[0].steps / goal) * 100) + 10;

  let texts = pointsCounter.selectAll("text").data([points]);

  texts
    .enter()
    .append("text")
    // .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("fill", "#00b359")
    .attr("font-size", 65)
    .attr("font-weight", 500)
    .attr('transform', 'translate(0, 5)')
    .transition()
    // .ease(d3.easeLinear)
    .duration(1000)
    .tween('text', d => counterTween(d));
};


let counterTween = (d) => {
  let i = d3.interpolateNumber(0, d);

  return function(t){
    let n = i(t);
    d3.select(this).text(Math.floor(n));
  }
}


buildStepsCounter();
buildPointsCounter();

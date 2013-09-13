// Iain Dillingham, <iain@dillingham.me.uk>
d3.svg.quartileplot = function() {

  var domain = null,
      duration = 750,
      height = 0,
      radius = 2,
      whiskersAccessor = null,
      yAccessor = function(d){ return d; },
      yScale = d3.scale.linear();

  function quartileplot(selection) {

    selection.each(function(datum, index) {

      var element = d3.select(this),
          data = yAccessor(datum).map(Number).sort(d3.ascending),
          q1 = d3.quantile(data, 0.25),
          q2 = d3.quantile(data, 0.5),
          q3 = d3.quantile(data, 0.75),
          min = data[0],
          max = data[data.length - 1],
          whiskers = whiskersAccessor ? whiskersAccessor.call(this, data) : [min, max];

      yScale
          .domain(domain ? domain.call(this) : [min, max])
          .range([height, 0]);

      // The first time this code is executed there won't be a circle.median for
      // the current quartile plot so we enter it. However, the second time it
      // is executed there will be a circle.median so we update it. This is a
      // compact way of determining which selection (enter or update) is
      // required.
      var median = element.selectAll(".median").data([q2]);

      median.enter().append("circle")
          .attr("class", "median")
          .attr("cx", 0)
          .attr("cy", yScale)
          .attr("r", radius);

      median.transition()
          .duration(duration)
          .attr("cy", yScale);

      // draw lower section of center line downwards from median
      var lower = element.selectAll(".lower").data([ [q1, whiskers[0]] ]);

      lower.enter().append("line")
          .attr("class", "center centre lower")
          .attr("x1", 0)
          .attr("y1", function(d){ return yScale(d[1]); })
          .attr("x2", 0)
          .attr("y2", function(d){ return yScale(d[0]); });

      lower.transition()
          .duration(duration)
          .attr("y1", function(d){ return yScale(d[1]); })
          .attr("y2", function(d){ return yScale(d[0]); });

      // draw upper section of center line upwards from median
      var upper = element.selectAll(".upper").data([ [q3, whiskers[1]] ]);

      upper.enter().append("line")
          .attr("class", "center centre upper")
          .attr("x1", 0)
          .attr("y1", function(d){ return yScale(d[1]); })
          .attr("x2", 0)
          .attr("y2", function(d){ return yScale(d[0]); });

      upper.transition()
          .duration(duration)
          .attr("y1", function(d){ return yScale(d[1]); })
          .attr("y2", function(d){ return yScale(d[0]); });

      // We fade out old outliers before fading in new outliers to make it clear
      // that the circle representing an outlier on the old quartile plot isn't
      // the same as the circle representing an outlier on the new quartile
      // plot. Consequently, we don't need to exit outliers.
      element.selectAll(".outlier").transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

      element.selectAll(".outlier")
          .data(data.filter(function(d){ return d < whiskers[0] || d > whiskers[1]; }))
        .enter().append("circle")
          .attr("class", "outlier")
          .attr("cx", 0)
          .attr("cy", yScale)
          .attr("r", radius)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1);

    });

  }

  quartileplot.domain = function(_) {
    if (!arguments.length) return domain ? domain.call(this) : domain;
    domain = d3.functor(_);
    return quartileplot;
  };

  quartileplot.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return quartileplot;
  };

  quartileplot.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return quartileplot;
  };

  quartileplot.radius = function(_) {
    if (!arguments.length) return radius;
    radius = _;
    return quartileplot;
  };

  quartileplot.whiskers = function(_) {
    if (!arguments.length) return whiskersAccessor;
    whiskersAccessor = _;
    return quartileplot;
  };

  quartileplot.y = function(_) {
    if (!arguments.length) return yAccessor;
    yAccessor = _;
    return quartileplot;
  };

  return quartileplot;

}

//copied much from this example https://gist.github.com/iaindillingham/5068071 by
// Iain Dillingham, <iain@dillingham.me.uk>
d3.svg.errorbar = function () {

  var xPos = 0,
      yPos = 0,
      margin = { top: 10, right: 10, bottom: 20, left: 40 },
      height = 400,
      width = 600,
      xVar = "x",
      yVar = "y",
      colorVar = null,
      color = d3.scale.category20(),
      stddev = "stddev",
      sdmult = 1.96;

  function errorbar(selection) {

    var xScale = d3.scale.ordinal()
        .rangePoints([0, width], 1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    selection.each(function (data, index) {
      var element = d3.select(this);
      //sort if desired
      //data.sort(function (a, b) {
      //return d3.descending(a.rank, b.rank);
      //  return d3.descending(a[yVar], b[yVar]);
      //});

      data = data.values;

      xScale.domain(data.map(function (d) {
        return d[xVar];
      }));

      yScale.domain(
        [0, d3.max(data, function (d) { return +d[yVar] + (sdmult * d[stddev]); })]
      );

      var errorbars = element.selectAll("g").data(data);

      errorbars.enter().append("g")
          .attr("class", "errorbars");

      errorbars.exit().remove();

      errorbars.each(function (errorbar, i) {
        errorbar = d3.select(this);
        //separate into an upper and lower line
        //first the lowerline
        errorbar.selectAll(".lower").data(errorbar.data())
          .enter().append("line")
            .attr("class", "lower")
            .attr("x1", function (d) { return xScale(d[xVar]); })
            .attr("y1", function (d) { return yScale(d[yVar]); })
            .attr("x2", function (d) { return xScale(d[xVar]); })
            .attr("y2", function (d) {
              return yScale(+d[yVar] - (sdmult * d[stddev]));
            })
            .attr("stroke", "rgb(151, 146, 146)");
        //now the upper line
        errorbar.selectAll(".upper").data(errorbar.data())
          .enter().append("line")
            .attr("class", "upper")
            .attr("x1", function (d) { return xScale(d[xVar]); })
            .attr("y1", function (d) { return yScale(d[yVar]); })
            .attr("x2", function (d) { return xScale(d[xVar]); })
            .attr("y2", function (d) {
              return yScale(+d[yVar] + (sdmult * d[stddev]));
            })
            .attr("stroke", "rgb(151, 146, 146)");
        //draw points last so they go on top
        errorbar.selectAll(".points").data(errorbar.data())
          .enter().append("circle")
            .attr("class", "points")
            .attr("cx", function (d) {
              return xScale(d[xVar])
            })
            .attr("cy", function (d) {
              return yScale(d[yVar])
            })
            .attr("fill", function (d) { return color(d[colorVar]) })
            .attr("r", 2); //radius parameter
      });

      /* could add x axis but for specific first purpose no room
      element.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      */

      element.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    });

  }

  errorbar.xPos = function (_) {
    if (!arguments.length) return xPos;
    xPos = _;
    return errorbar;
  };

  errorbar.yPos = function (_) {
    if (!arguments.length) return yPos;
    yPos = _;
    return errorbar;
  };

  errorbar.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return errorbar;
  };

  errorbar.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return errorbar;
  };

  errorbar.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return errorbar;
  };

  errorbar.xVar = function (_) {
    if (!arguments.length) return xVar;
    xVar = _;
    return errorbar;
  };

  errorbar.yVar = function (_) {
    if (!arguments.length) return yVar;
    yVar = _;
    return errorbar;
  };

  errorbar.colorVar = function (_) {
    if (!arguments.length) return colorVar;
    colorVar = _;
    return errorbar;
  };

  errorbar.color = function (_) {
    if (!arguments.length) return color ? color.call(this) : color;
    color = d3.functor(_);
    return errorbar;
  }

  errorbar.sttdev = function (_) {
    if (!arguments.length) return stddev;
    stddev = _;
    return errorbar;
  };

  errorbar.sdmult = function (_) {
    if (!arguments.length) return sdmult;
    sdmult = _;
    return errorbar;
  };

  return errorbar;

}

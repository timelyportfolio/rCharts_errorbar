//copied much from this example https://gist.github.com/iaindillingham/5068071 by
// Iain Dillingham, <iain@dillingham.me.uk>
d3.errorbar = function() {

  function errorbar(selection) {

    var x = d3.scale.ordinal()
        .rangePoints([0, width], 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var color = d3.scale.category20();

    selection.each(function(data, index) {
      //sort if desired
      data.sort(function (a, b) {
        //return d3.descending(a.rank, b.rank);
        return d3.descending(a.ave, b.ave);
      });

      data = data.filter(function (d) { return d.ppr == "N" });

      x.domain(data.map(function (d) {
        return d.player;
      }));

      y.domain(d3.extent(data, function (d) {
        return d.ave;
      }))

      var errorbars = selection.selectAll("g").data(data);
            
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
            .attr("x1", function (d) { return x(d.player); })
            .attr("y1", function (d) { return y(d.ave); })
            .attr("x2", function (d) { return x(d.player); })
            .attr("y2", function (d) {
              return y(+d.ave - (1.96 * d.stddev));
            })
            .attr("stroke", "rgb(151, 146, 146)");
        //now the upper line
        errorbar.selectAll(".upper").data(errorbar.data())
          .enter().append("line")
            .attr("class", "upper")
            .attr("x1", function (d) { return x(d.player); })
            .attr("y1", function (d) { return y(d.ave); })
            .attr("x2", function (d) { return x(d.player); })
            .attr("y2", function (d) {
              return y(+d.ave + (1.96 * d.stddev));
            })
            .attr("stroke", "rgb(151, 146, 146)");
        //draw points last so they go on top
        errorbar.selectAll(".points").data(errorbar.data())
          .enter().append("circle")
            .attr("class", "points")
            .attr("cx", function (d) {
              return x(d.player)
            })
            .attr("cy", function (d) {
              return y(d.ave)
            })
            .attr("fill", function (d) { return color(d.category) })
            .attr("r", 2); //radius parameter
      });

    });

  }

  return errorbar;

}

var n = 3, // number of layers
    m = 12; // number of samples per layer

var margin = {top: 20, right: 50, bottom: 50, left: 75},
    width = 840 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("#farm").append("svg")
    .attr("id", "stacked-health-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/csv/farm.csv", function (data){

    var headers = ["qoq","yoy"]

    var layers = d3.layout.stack()(headers.map(function(foo) {
        return data.map(function(d) {
          return {x: d.region, y: +d[foo]};
        });
    }));
// console.log(layers);
    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var xScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .domain(headers)
        .range(["#a05d56", "#d0743c"]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(4,0)
        .tickFormat(function(d) { return d; })

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return xScale(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    //********** AXES ************
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "end")
            .attr("dx", "0.45em")
            .attr("class", "farmtext")
            .attr("dy", "1.35em")
            .attr("transform", function(d) {
                  return "rotate(0)"
                });

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr({"x": -200, "y": -50})
        .attr("dy", ".75em")
        .style("text-anchor", "end")
        .attr("class", "farmtext")
        .text("% Change");

    var legend = svg.selectAll(".legend")
        .data(headers.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-20," + i * 30 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d;  });


   function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
          .duration(1500)
          .delay(function(d, i) { return i * 10; })
          .attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
          .attr("width", xScale.rangeBand() / n)
        .transition()
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });

    };


    transitionGrouped();

});
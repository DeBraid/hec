var n = 9, // number of layers
    m = 6; // number of parts 

var margin = {top: 20, right: 50, bottom: 100, left: 75},
    width = 340 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svggeneral = d3.select("#general-stacked").append("svg:general")
    .attr("id", "stacked-general-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/csv/generaldash.csv", function (data){

    var headers = ["Employees","Share of Jobs in Hamilton","Revenue","Revenue Per Employee","Revenue Relative to GDP","Share of Revenue Relative to GDP"];


    var layers = d3.layout.stack()(headers.map(function(priceRange) {
        return data.map(function(d) {
          return {x: d.firm, y: +d[priceRange]};
        });
    }));

    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });

    var xScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, width], .08);

    var y = d3.scale.linear()
        .domain([0, yGroupMax])
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .domain(headers)
        .range(["#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var layer = svggeneral.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", xScale.rangeBand() / n)
        .attr("height", function(d) { return height - y(d.y); });

    //********** AXES ************
    svggeneral.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "end")
            .attr("dx", "5em")
            .attr("dy", "1.35em")
            .attr("transform", function(d) {
                  return "rotate(0)"
                });

    svggeneral.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr({"x": -80, "y": -50})
        .attr("dy", ".75em")
        .style("text-anchor", "end")
        .text("Dashboard");

    var legend = svggeneral.selectAll(".legend")
        .data(headers.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")"; });

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
              .text(function(d) { return d; });



});
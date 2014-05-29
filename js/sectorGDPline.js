
var margin = {top: 20, right: 300, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.gdp); });

var svg = d3.select('#line-chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "linesvg")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/csv/sectorGDPline.csv", function(error, data) {
  var headers = [

        "Finance, Insurance and Real Estate",
        "Education, Health Care, Agriculture, Primary Industries",
        "Manufacturing",
        "Wholesale and Retail Trade",
        "Business Services",
        "Construction",
        "Transportation and Warehousing",
        "Information and Cultural Industries",

  ];
  
  color.domain(headers);

  var sectors = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, gdp: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(sectors, function(c) { return d3.min(c.values, function(v) { return v.gdp; }); }),
    d3.max(sectors, function(c) { return d3.max(c.values, function(v) { return v.gdp; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .text("String");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP");

  var city = svg.selectAll(".city")
      .data(sectors)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.gdp) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .attr("id", "wrapme")
      .text(function(d) { return '$ ' + d3.round(d.value.gdp*0.01, 2) + ' billion' });



var legend = svg.selectAll(".legend")
        .data(sectors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(275," + (i * 60) + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) { return color(d.name) });

        legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d.name });
            
});

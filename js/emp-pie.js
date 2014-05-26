var width = 560,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.employees; });

var svg = d3.select("#emp-pie").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  data = 
  [
   {"firm": "HCF", "employees": "20"},
{"firm": "Port Authority", "employees": "58"},
{"firm": "Airport", "employees": "45"},
{"firm": "MIP", "employees": "701"},
{"firm": "Redeemer", "employees": "210"},
{"firm": "McMaster", "employees": "7800"},
{"firm": "Mohawk", "employees": "947"},
{"firm": "StJoes", "employees": "10994"},
{"firm": "HHS", "employees": "11780"}
  ]

  data.forEach(function(d) {
    d.employees = +d.employees;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.firm); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.firm; });

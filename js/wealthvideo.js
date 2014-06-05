// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.income; }
function y(d) { return d.gdp; }
function radius(d) { return d.uRate; }
function key(d) { return d.city; }


var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { 
      return '<span>' + d.city + '</span>' 
          + '<br>'
          + '<br>'
          + 'GDP: ' 
          + '<span>' + '$' + d3.round(d.gdp*0.001, 0) + ' billion' + '</span>'
          + '<br>'
          + '<br>'
          + 'Income: ' 
          + '<span>' + '$' + d3.round(d.income) + ' per person' + '</span>'
          + '<br>';

    })
    .offset([-12, 0]);

// Chart dimensions.
var margin = {top: 19.5, right: 65.5, bottom: 109.5, left: 39.5},
    width = 960 - margin.right,
    height = 600 - margin.top - margin.bottom;

// Various scales. These domains make assumptions of data, naturally.
var xScale = d3.scale.linear().domain([18e3, 45e3]).range([0, width]),
    yScale = d3.scale.log().domain([1e3, 4e5]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([3, 16]).range([30, 3]),
    colorScale = d3.scale.category20();

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(6, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).ticks(3, d3.format("2s")).orient("left");

// Create the SVG container and set the origin.
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .text("income per capita");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("GDP");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width + 70)
    .text(1987);

// Load the data.
d3.json("/js/myNations.json", function(nations) {

  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

  // Add a dot per nation. Initialize the data at 1987, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(1987))
    .enter().append("circle")
      .attr("class", "dot")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("id", function () { return this.__data__.city; })
      .style("fill", "#00AE9D")
      .call(position)
      .sort(order);

var headers = ['Hamilton', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Halifax', 'Winnipeg', 'Edmonton', 'Kitchener', 'London'];

var legend = svg.selectAll(".legend")
  .data(headers.slice())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width + 60)
      .attr("width", 18)
      .attr("height", 18)
      .attr("id", function (d) { return d; });

  legend.append("text")
        .attr("x", width + 54)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;  });

  // Add an overlay for the year label.
  var box = label.node().getBBox();

  var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y + 50)
        .attr("width", box.width)
        .attr("height", box.height - 150)
        .on("mouseover", enableInteraction);

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(50000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {
    var yearScale = d3.scale.linear()
        .domain([1987, 2018])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    // Cancel the current transition, if any.
    svg.transition().duration(0);

    overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(1987, 2018);
    return function(t) { displayYear(year(t)); };
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year), key).call(position).sort(order);
    label.text(Math.round(year));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        city: d.city,
        region: d.region,
        income: interpolateValues(d.income, year),
        uRate: interpolateValues(d.uRate, year),
        gdp: interpolateValues(d.gdp, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }

  customHammerLabel();
  customFills();

});

var customHammerLabel = function () {
  var hammer = d3.select("circle#Hamilton.dot"); 
  var hammerLeg = d3.select("rect#Hamilton"); 

  hammer.style({
    "fill": "yellow", 
    "stroke-width": "6px"
  });

  hammerLeg.style({
    "stroke": "black", 
    "stroke-width": "2px"
  });


}

function customFills () {

  var fillData = [
    {"city": "Hamilton", "fill": "yellow"},
    {"city": "Toronto", "fill": "rgb(174, 199, 232)"},
    {"city": "Vancouver", "fill": "rgb(255, 127, 14)"},
    {"city": "Montreal", "fill": "rgb(255, 187, 120)"},
    {"city": "Calgary", "fill": "rgb(44, 160, 44)"},
    {"city": "Halifax", "fill": "rgb(152, 223, 138)"},
    {"city": "Winnipeg", "fill": "rgb(154, 29, 40)"},
    {"city": "Edmonton", "fill": "rgb(255, 152, 150)"},
    {"city": "Kitchener", "fill": "rgb(148, 103, 189)"},
    {"city": "London", "fill": "rgb(197, 176, 213)"},
  ];
  
  fillData.forEach(function (obj) {

      var selectedLabel = d3.selectAll("#" + obj.city); 

      selectedLabel
        .style({
          "fill": obj.fill
        })

  })
}


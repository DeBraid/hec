var GoaliesvalueLabelWidth = 80; // space reserved for value labels (right)
var GoaliesbarHeight = 18; // height of one bar
var GoaliesbarLabelWidth = 40; // space reserved for bar labels
var GoaliesbarLabelPadding = 4; // padding between bar and bar labels (left)
var GoaliesgridLabelHeight = 18; // space reserved for gridline labels
var GoaliesgridChartOffset = 10; // space between start of grid and first bar
var GoaliesmaxBarWidth = 200; // width of the bar with the max value
 
// accessor functions 
var GoaliesbarLabel = function(d) { return d['team']; };
var GoaliesbarValue = function(d) { return parseFloat(+d['goalies']); };

var addCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// var tip = d3.tip()
//     .attr('class', 'd3-tip')
//     .html(function(d) { 
//     return  'Share of Jobs in Hamilton: ' 
//           + '<span>' + d3.round(d.Employees*100/totalEmp, 2) + '%' + '</span>' 
//           + '<br>';
//      })
//     .offset([-12, 0]);

d3.csv('/csv/nhlcap.csv', function (error, data) {
  
  function renderChart() {
    
    // sorting
    var sortedData = data.sort(function(a, b) {
     return d3.descending(GoaliesbarValue(a), GoaliesbarValue(b));
    }); 
    
    // if (sortedData.length > 12) { sortedData.length = 12 };

    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * GoaliesbarHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(sortedData, GoaliesbarValue)]).range([0, maxBarWidth]);
    // svg container element
    var GoaliesChart = d3.select('#Goalies').append("svg").attr("class", "Goalies-chart")
      .attr('width', maxBarWidth + GoaliesbarLabelWidth + GoaliesvalueLabelWidth)
      .attr('height', GoaliesgridLabelHeight + GoaliesgridChartOffset + sortedData.length * GoaliesbarHeight);

    // grid line labels
    var GoaliesGridCont = GoaliesChart.append('g')
      .attr('transform', 'translate(' + GoaliesbarLabelWidth + ',' + GoaliesgridLabelHeight + ')'); 

    GoaliesGridCont.selectAll("Goalies-chart text")
      .data(x.ticks(3)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(function(d){ return addCommas(d); });

    // vertical grid lines
    GoaliesGridCont.selectAll("Goalies-chart line")
      .data(x.ticks(2)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + GoaliesgridChartOffset)
      .style("stroke", "#ccc");

    // bar labels
    var GoaliesLabelsCont = GoaliesChart.append('g')
      .attr('transform', 'translate(' + (GoaliesbarLabelWidth - GoaliesbarLabelPadding) + ',' + (GoaliesgridLabelHeight + GoaliesgridChartOffset) + ')'); 
    GoaliesLabelsCont.selectAll('Goalies-chart text').data(sortedData).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(GoaliesbarLabel);

    // bars
    var GoaliesBarsCont = GoaliesChart.append('g')
      .attr('transform', 'translate(' + GoaliesbarLabelWidth + ',' + (GoaliesgridLabelHeight + GoaliesgridChartOffset) + ')'); 

    GoaliesBarsCont.selectAll("Goalies-chart rect")
      .data(sortedData).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(GoaliesbarValue(d)); })
      .attr('stroke', 'white')
      .attr("id", function ( d,i ) { return GoaliesbarLabel(d); })
      .attr('fill','#001F3F');


    // bar value labels
    GoaliesBarsCont.selectAll("Goalies-chart text")
      .data(sortedData).enter().append("text")
      .attr("x", function(d) { return x(GoaliesbarValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return addCommas(GoaliesbarValue(d)); });

    // start line
    GoaliesBarsCont.append("line")
      .attr("y1", -GoaliesgridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + GoaliesgridChartOffset)
      .style("stroke", "#000");
}


  renderChart();

})
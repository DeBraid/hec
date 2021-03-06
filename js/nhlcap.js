var valueLabelWidth = 80; // space reserved for value labels (right)
var barHeight = 18; // height of one bar
var barLabelWidth = 40; // space reserved for bar labels
var barLabelPadding = 4; // padding between bar and bar labels (left)
var gridLabelHeight = 18; // space reserved for gridline labels
var gridChartOffset = 10; // space between start of grid and first bar
var maxBarWidth = 100; // width of the bar with the max value
 
// accessor functions 
var barLabel = function(d) { return d['team']; };
var barValue = function(d) { return parseFloat(+d['cap space']); };

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
     return d3.descending(barValue(a), barValue(b));
    }); 
    
    // if (sortedData.length > 12) { sortedData.length = 12 };

    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * barHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(sortedData, barValue)]).range([0, maxBarWidth]);
    // svg container element
    var chartCapSpace = d3.select('#cap-space').append("svg").attr("class", "cap-space")
      .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
      .attr('height', gridLabelHeight + gridChartOffset + sortedData.length * barHeight);

    // grid line labels
    var gridContainerCapSpace = chartCapSpace.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 

    gridContainerCapSpace.selectAll("text")
      .data(x.ticks(3)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(function(d){ return addCommas(d); });

    // vertical grid lines
    gridContainerCapSpace.selectAll("line")
      .data(x.ticks(3)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#ccc");

    // bar labels
    var labelsContainer = chartCapSpace.append('g')
      .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
    labelsContainer.selectAll('text').data(sortedData).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(barLabel);

    // bars
    var barsContainer = chartCapSpace.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

    barsContainer.selectAll("rect")
      .data(sortedData).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(barValue(d)); })
      .attr('stroke', 'white')
      .attr("id", function ( d,i ) { return barLabel(d); })
      .attr('fill','#3D9970');


    // bar value labels
    barsContainer.selectAll("text")
      .data(sortedData).enter().append("text")
      .attr("x", function(d) { return x(barValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return addCommas(barValue(d)); });

    // start line
    barsContainer.append("line")
      .attr("y1", -gridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#000");
}


  renderChart();

})
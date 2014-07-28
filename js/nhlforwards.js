var ForwardsvalueLabelWidth = 80; // space reserved for value labels (right)
var ForwardsbarHeight = 18; // height of one bar
var ForwardsbarLabelWidth = 40; // space reserved for bar labels
var ForwardsbarLabelPadding = 4; // padding between bar and bar labels (left)
var ForwardsgridLabelHeight = 18; // space reserved for gridline labels
var ForwardsgridChartOffset = 10; // space between start of grid and first bar
var ForwardsmaxBarWidth = 200; // width of the bar with the max value
 
// accessor functions 
var ForwardsbarLabel = function(d) { return d['team']; };
var ForwardsbarValue = function(d) { return parseFloat(+d['fwds']); };

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
     return d3.descending(ForwardsbarValue(a), ForwardsbarValue(b));
    }); 
    
    // if (sortedData.length > 12) { sortedData.length = 12 };

    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * ForwardsbarHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(sortedData, ForwardsbarValue)]).range([0, maxBarWidth]);
    // svg container element
    var ForwardsChart = d3.select('#forwards').append("svg").attr("class", "forwards-chart")
      .attr('width', maxBarWidth + ForwardsbarLabelWidth + ForwardsvalueLabelWidth)
      .attr('height', ForwardsgridLabelHeight + ForwardsgridChartOffset + sortedData.length * ForwardsbarHeight);

    // grid line labels
    var ForwardsGridCont = ForwardsChart.append('g')
      .attr('transform', 'translate(' + ForwardsbarLabelWidth + ',' + ForwardsgridLabelHeight + ')'); 

    ForwardsGridCont.selectAll("forwards-chart text")
      .data(x.ticks(3)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(function(d){ return addCommas(d); });

    // vertical grid lines
    ForwardsGridCont.selectAll("forwards-chart line")
      .data(x.ticks(2)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + ForwardsgridChartOffset)
      .style("stroke", "#ccc");

    // bar labels
    var ForwardsLabelsCont = ForwardsChart.append('g')
      .attr('transform', 'translate(' + (ForwardsbarLabelWidth - ForwardsbarLabelPadding) + ',' + (ForwardsgridLabelHeight + ForwardsgridChartOffset) + ')'); 
    ForwardsLabelsCont.selectAll('forwards-chart text').data(sortedData).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(ForwardsbarLabel);

    // bars
    var ForwardsBarsCont = ForwardsChart.append('g')
      .attr('transform', 'translate(' + ForwardsbarLabelWidth + ',' + (ForwardsgridLabelHeight + ForwardsgridChartOffset) + ')'); 

    ForwardsBarsCont.selectAll("forwards-chart rect")
      .data(sortedData).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(ForwardsbarValue(d)); })
      .attr('stroke', 'white')
      .attr("id", function ( d,i ) { return ForwardsbarLabel(d); })
      .attr('fill','#0074d9');


    // bar value labels
    ForwardsBarsCont.selectAll("forwards-chart text")
      .data(sortedData).enter().append("text")
      .attr("x", function(d) { return x(ForwardsbarValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return addCommas(ForwardsbarValue(d)); });

    // start line
    ForwardsBarsCont.append("line")
      .attr("y1", -ForwardsgridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + ForwardsgridChartOffset)
      .style("stroke", "#000");
}


  renderChart();

})
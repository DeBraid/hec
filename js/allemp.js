var valueLabelWidth = 40; // space reserved for value labels (right)
var barHeight = 36; // height of one bar
var barLabelWidth = 200; // space reserved for bar labels
var barLabelPadding = 5; // padding between bar and bar labels (left)
var gridLabelHeight = 18; // space reserved for gridline labels
var gridChartOffset = 10; // space between start of grid and first bar
var maxBarWidth = 320; // width of the bar with the max value
var totalEmp = 379200;
 
// accessor functions 
var barLabel = function(d) { return d['Company']; };
var barValue = function(d) { return parseFloat(+d['Employees']); };

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { 
    return  'Share of Jobs in Hamilton: ' 
          + '<span>' + d3.round(d.Employees*100/totalEmp, 2) + '%' + '</span>' 
          + '<br>';
     })
    .offset([-12, 0]);

d3.csv('/csv/allemp.csv', function (error, data) {
  
  function renderChart() {
    
    // sorting
    var sortedData = data.sort(function(a, b) {
     return d3.descending(barValue(a), barValue(b));
    }); 
    
    if (sortedData.length > 10) { sortedData.length = 12 };

    var newData = sortedData.map(function (d) {

      var rat = d3.round(d.Employees*100/totalEmp, 2);

      return {
                Company: d.Company,
                Employees: +d.Employees,
                Ratio: rat
              }

    })

    console.log(newData);
    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, newData.length)).rangeBands([0, newData.length * barHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(newData, barValue)]).range([0, maxBarWidth]);
    // svg container element
    var chart = d3.select('#all-employees').append("svg")
      .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
      .attr('height', gridLabelHeight + gridChartOffset + newData.length * barHeight);

    // grid line labels
    var gridContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 

    gridContainer.selectAll("text")
      .data(x.ticks(3)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(function(d){ return d });

    // vertical grid lines
    gridContainer.selectAll("line")
      .data(x.ticks(3)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#ccc");

    // bar labels
    var labelsContainer = chart.append('g')
      .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
    labelsContainer.selectAll('text').data(newData).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(barLabel);

    // bars
    var barsContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

      chart.call(tip);

    barsContainer.selectAll("rect")
      .data(newData).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(barValue(d)); })
      .attr('stroke', 'white')
      .attr("id", function ( d,i ) { return barLabel(d); })
      .attr('fill','#00AE9D')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // bar value labels
    barsContainer.selectAll("text")
      .data(newData).enter().append("text")
      .attr("x", function(d) { return x(barValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return barValue(d); });

    // start line
    barsContainer.append("line")
      .attr("y1", -gridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#000");
}


  renderChart();

})
var DefencevalueLabelWidth = 80; // space reserved for value labels (right)
var DefencebarHeight = 18; // height of one bar
var DefencebarLabelWidth = 40; // space reserved for bar labels
var DefencebarLabelPadding = 4; // padding between bar and bar labels (left)
var DefencegridLabelHeight = 18; // space reserved for gridline labels
var DefencegridChartOffset = 10; // space between start of grid and first bar
var DefencemaxBarWidth = 200; // width of the bar with the max value
 
// accessor functions 
var DefencebarLabel = function(d) { return d['team']; };
var DefencebarValue = function(d) { return parseFloat(+d['dmen']); };

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
     return d3.descending(DefencebarValue(a), DefencebarValue(b));
    }); 
    
    // if (sortedData.length > 12) { sortedData.length = 12 };

    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * DefencebarHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(sortedData, DefencebarValue)]).range([0, maxBarWidth]);
    // svg container element
    var DefenceChart = d3.select('#Defence').append("svg").attr("class", "Defence-chart")
      .attr('width', maxBarWidth + DefencebarLabelWidth + DefencevalueLabelWidth)
      .attr('height', DefencegridLabelHeight + DefencegridChartOffset + sortedData.length * DefencebarHeight);

    // grid line labels
    var DefenceGridCont = DefenceChart.append('g')
      .attr('transform', 'translate(' + DefencebarLabelWidth + ',' + DefencegridLabelHeight + ')'); 

    DefenceGridCont.selectAll("Defence-chart text")
      .data(x.ticks(3)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(function(d){ return addCommas(d); });

    // vertical grid lines
    DefenceGridCont.selectAll("Defence-chart line")
      .data(x.ticks(2)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + DefencegridChartOffset)
      .style("stroke", "#ccc");

    // bar labels
    var DefenceLabelsCont = DefenceChart.append('g')
      .attr('transform', 'translate(' + (DefencebarLabelWidth - DefencebarLabelPadding) + ',' + (DefencegridLabelHeight + DefencegridChartOffset) + ')'); 
    DefenceLabelsCont.selectAll('Defence-chart text').data(sortedData).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(DefencebarLabel);

    // bars
    var DefenceBarsCont = DefenceChart.append('g')
      .attr('transform', 'translate(' + DefencebarLabelWidth + ',' + (DefencegridLabelHeight + DefencegridChartOffset) + ')'); 

    DefenceBarsCont.selectAll("Defence-chart rect")
      .data(sortedData).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(DefencebarValue(d)); })
      .attr('stroke', 'white')
      .attr("id", function ( d,i ) { return DefencebarLabel(d); })
      .attr('fill','#7fdbff');


    // bar value labels
    DefenceBarsCont.selectAll("Defence-chart text")
      .data(sortedData).enter().append("text")
      .attr("x", function(d) { return x(DefencebarValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return addCommas(DefencebarValue(d)); });

    // start line
    DefenceBarsCont.append("line")
      .attr("y1", -DefencegridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + DefencegridChartOffset)
      .style("stroke", "#000");
}


  renderChart();

})
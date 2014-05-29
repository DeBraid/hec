
var valueLabelWidth = 70; // space reserved for value labels (right)
var barHeight = 36; // height of one bar
var barLabelWidth = 250; // space reserved for bar labels
var barLabelPadding = 5; // padding between bar and bar labels (left)
var gridLabelHeight = 18; // space reserved for gridline labels
var gridChartOffset = 10; // space between start of grid and first bar
var maxBarWidth = 420; // width of the bar with the max value
 
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { return '<span>' + d3.round((d.gdp/1571741)*100,2) + '</span>' + '% of total economy' })
    .offset([-12, 0]);

var barnumber = 10,
    page = 1, 
    _last = document.getElementById('last'),
    _next = document.getElementById('next'),
    barLabel = function(d) { return d['type']; },
    barValue = function(d) { return parseFloat(+d['gdp']); };
 


function renderChart() {
    
  d3.csv('/csv/gdpBySectorAll-clean.csv', function (error, data) {
      
    // sorting
    var sortedData = data.sort(function(a, b) {
     return d3.descending(barValue(a), barValue(b));
    }); 
    
    var viewdata = sortedData;

    _next.onclick = function() {
        page++;
        viewdata = sortedData.slice(
            (page-1) * barnumber,
            page*barnumber
        );
        redraw();
    };

    _last.onclick = function() {
        page--;
        viewdata = sortedData.slice(
            
            (page-1) * barnumber,
            page*barnumber
        );
        redraw();
    };    


    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, viewdata.length)).rangeBands([0, viewdata.length * barHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, d3.max(viewdata, barValue)]).range([0, maxBarWidth]);
    // svg container element
    var chart = d3.select('#gdp-by-sector-chart').append("svg")
      .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
      .attr('height', gridLabelHeight + gridChartOffset + viewdata.length * barHeight);

    // grid line labels
    var gridContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 

    // bar labels
    var labelsContainer = chart.append('g')
      .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

    var barsContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

    chart.call(tip);

    gridContainer.selectAll("text")
      .data(x.ticks(10)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);

    // vertical grid lines
    gridContainer.selectAll("line")
      .data(x.ticks(10)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#ccc");

    labelsContainer.selectAll('text').data(viewdata).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(barLabel);

    barsContainer.selectAll("rect")
      .data(viewdata).enter().append("rect")
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
      .data(viewdata).enter().append("text")
      .attr("x", function(d) { return x(barValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".05em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("font-size", "15")
      .attr("stroke", "none")
      .text(function(d) { return "$" + d3.round(barValue(d)*0.001, 3); });

    // start line
    barsContainer.append("line")
      .attr("y1", -gridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#000");


    function redraw () {
        console.log(viewdata);

        // scales
        var yScale = d3.scale.ordinal().domain(d3.range(0, viewdata.length)).rangeBands([0, viewdata.length * barHeight]);
        var y = function(d, i) { return yScale(i); };
        var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
        var x = d3.scale.linear()
                .domain([0, d3.max(viewdata, barValue)])
                .range([0, maxBarWidth]);

        gridContainer.selectAll("text")
          .data(x.ticks(10)).transition.duration(500)
          .attr("x", x)
          .attr("dy", -3)
          .attr("text-anchor", "middle")
          .text(String);

        // vertical grid lines
        gridContainer.selectAll("line")
          .data(x.ticks(10)).transition.duration(500)
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
          .style("stroke", "#ccc");

        labelsContainer.selectAll('text').data(viewdata).transition.duration(500)
          .attr('y', yText)
          .attr('stroke', 'none')
          .attr('fill', 'black')
          .attr("dy", ".35em") // vertical-align: middle
          .attr('text-anchor', 'end')
          .text(barLabel);

        barsContainer.selectAll("rect")
          .data(viewdata).transition.duration(500)
          .attr('y', y)
          .attr('height', yScale.rangeBand() - 9)
          .attr('width', function ( d ) { return x(barValue(d)); })
          .attr('stroke', 'white')
          .attr("id", function ( d,i ) { return barLabel(d); })
          .attr('fill','#00AE9D');

        // bar value labels
        barsContainer.selectAll("text")
          .data(viewdata).transition.duration(500)
          .attr("x", function(d) { return x(barValue(d)); })
          .attr("y", yText)
          .attr("dx", 3) // padding-left
          .attr("dy", ".05em") // vertical-align: middle
          .attr("text-anchor", "start") // text-align: right
          .attr("fill", "black")
          .attr("font-size", "15")
          .attr("stroke", "none")
          .text(function(d) { return "$" + d3.round(barValue(d)*0.001, 3); });

        // start line
        barsContainer.append("line")
          .attr("y1", -gridChartOffset)
          .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
          .style("stroke", "#000");

      }

  })
};

window.onload = renderChart;
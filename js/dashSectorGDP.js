var valueLabelWidth = 40; // space reserved for value labels (right)
    barHeight = 36, // height of one bar
    barLabelWidth = 200, // space reserved for bar labels
    barLabelPadding = 5, // padding between bar and bar labels (left)
    gridLabelHeight = 18, // space reserved for gridline labels
    gridChartOffset = 10, // space between start of grid and first bar
    maxBarWidth = 480, // width of the bar with the max value
    barnumber = 10,
    page = 1,
    _next = document.getElementById('next'),
    _last = document.getElementById('last');

    var w = 400, h = 400;


// accessor functions 
var barLabel = function(d) { return d['type']; };
var barValue = function(d) { return parseFloat(+d['gdp']); };
 
queue()
  .defer(d3.csv, '/csv/gdpBySectorAll-clean.csv')
  .await(sortData);

function sortData ( error, data ) {

  // sorting
  var sortedData = data.sort(function(a, b) {
   return d3.descending(barValue(a), barValue(b));
  }); 
  
  var viewdata = sortedData.slice((page-1)*barnumber,page*barnumber);

  bars(viewdata);

}


function bars ( data ) {


    // svg container element
  var chart = d3.select('#mega-chart').append("svg")
    .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
    .attr('height', gridLabelHeight + gridChartOffset + 10 * barHeight); 
  // scales
  var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
  var y = function(d, i) { return yScale(i); };
  var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
  var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);
  

  console.log(data);
  console.log('data *** ');
    
  // var bars = vis.selectAll("rect.bar")
  //     .data(data)

  var barsContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

  var bars = barsContainer.selectAll("rect")
      .data(data);

  // update
  bars.attr('stroke', 'white')
      .attr('fill','#00AE9D');    

  //enter
  bars.enter().append("rect")
      .attr('stroke', 'white')
      .attr('fill','#00AE9D')
      .attr("id", function ( d,i ) { return barLabel(d); });

  bars.exit()
    .transition()
    .duration(300)
    .ease("exp")
        .attr("width", 0)
        .remove();

  bars.transition()
    .duration(500)
    .ease("quad")
      .attr('y', y)
      .attr('height', yScale.rangeBand() - 9)
      .attr('width', function ( d ) { return x(barValue(d)); })
      .attr('stroke', 'white')
      .attr('fill','#00AE9D');


  _next.onclick = function() {
    page++;
    viewdata = sortedData.slice((page-1)*barnumber,page*barnumber);
    console.log(viewdata);
    bars(viewdata);
  };


  _last.onclick = function() {
    page--;
    viewdata = sortedData.slice((page-1)*barnumber,page*barnumber);
    console.log(viewdata);
    bars(viewdata);
  };


}


function init()
{

    //setup the svg
    // var chart = d3.select("#mega-chart").append("svg")
    //     .attr("width", w+100)
    //     .attr("height", h+100);

    // chart.append("svg:rect")
    //     .attr("width", "100%")
    //     .attr("height", "100%")
    //     .attr("stroke", "#000")
    //     .attr("fill", "none");

    // chart.append("svg:g")
    //     .attr("id", "barchart")
    //     .attr("transform", "translate(50,50)")
    
    // //setup our ui
    // d3.select("#next")
    //     .on("click", function(d,i) {
    //         bars(viewdata)
    //     })  
         
    // d3.select("#last")
    //     .on("click", function(d,i) {
    //         bars(data)
    //     })   



}

init();
var n = 3, // number of layers
    m = 30; // number of samples per layer

var margin = {top: 20, right: 50, bottom: 100, left: 35},
    width = 760 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
          if (d.y) {
            return '<span>' + d.x + ': ' + d.y + ' %' + '</span>';
          }
    })
    .offset([-12, 0]);

var svg = d3.select("#position").append("svg")
    .attr("id", "position")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


d3.csv( "/csv/nhlcap.csv" , function ( data ){

    var headers = ["fwdspct", "dmenpct", "goaliespct"];


    var layers = d3.layout.stack()(headers.map(function(datum) {
        return data.map(function(d) {
          return {x: d.team, y: +d[datum]};
        });
    }));

    var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });

    var xScale = d3.scale.ordinal()
        .domain(layers[0].map(function(d) { return d.x; }))
        .rangeRoundBands([25, width], .08);

    var y = d3.scale.linear()
        .domain([0, yGroupMax])
        .range([height, 50]);

    var color = d3.scale.ordinal()
        .domain(headers)
        .range(["#0074d9", "#7fdbff", "#001F3F"]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(4,0)
        .tickFormat(function(d) { return d; })

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
        .attr("width", xScale.rangeBand() / n)
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); })
        .attr("stroke", "white")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    //********** AXES ************
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text").style("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("class", "farmtext")
            .attr("dy", "0em")
            .attr("transform", function(d) { return "rotate(305)" });

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr({"x": -200, "y": -50})
        .attr("dy", ".75em")
        .style("text-anchor", "end")
        .attr("class", "farmtext")
        .text("% of Cap");

    var legend = svg.selectAll(".legend")
        .data(headers.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-20," + i * 30 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { 
                if ( d == 'fwdspct') {
                  return 'Forwards'
                } else if ( d == 'dmenpct') {
                  return 'Defence'
                }
                return 'Goalies';  

              });

});

var w = 416;
var h = 294;
var padding=27;
var word ="";
var blackcount = 0;    
var whitecount= 0;
var whiterate= 500;
var blackrate= 500;
var barcolors=["rgb(254,154,24)","rgb(82,167,200)"];
var racelabels=["White Players","Black Players"];
    
var dataset = [whiterate,blackrate];
    
var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([padding, w-4], 0.27);
    
var yScale = d3.scale.linear()
        .domain([0,d3.max(dataset)*1.2])
        .range([h - padding, 8]);
    
var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(6)
                .tickSize(4);
    
var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(function (d) { return ''; })
                .tickSize(0);
    
var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    

    
svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return xScale(i);
         })
         .attr("y", function(d) {
            return yScale(d);
         })
         .attr("width", xScale.rangeBand())
         .attr("height", function(d) {
            return h-padding-yScale(d);
               })
                .attr("fill", function(d,i) {
          return barcolors[i];
         });

    
svg.selectAll("text")
         .data(dataset)
         .enter()
         .append("text")
         .text("?")
                .attr("text-anchor", "middle")
                .attr("class","datalabels")
                .attr("x", function(d, i) {
            return xScale(i)+xScale.rangeBand() / 2;
         })
         .attr("y", function(d) {
            return yScale(d)-7;
         });

svg.append("g")
        .attr("class", "axis")
        .attr("transform","translate("+padding+",0)")
        .call(yAxis);
    
svg.append("g")
        .attr("class", "axis")
        .attr("transform","translate(0,"+(h-padding)+")")
        .call(xAxis);
    
svg.append("text")
        .attr("x", 134.5)
        .attr("y", 288)
        .attr("class","label")
        .style("text-anchor", "middle")
        .text("White Players");
    
svg.append("text")
        .attr("x", 303.5)
        .attr("y", 288)
        .attr("class","label")
        .style("text-anchor", "middle")
        .text("Black Players");
    
d3.csv("/csv/gdpbySectorAll-clean.csv", function(data) {black = data;});
d3.csv("/csv/gdpbySectorAll-clean.csv", function(data) {white = data;})

//function from form

function record (form) {
    word = new String(form.inputbox.value).toLowerCase();
    
     for(var i = 0; i < black.length; i++){
     if(black[i].word===word){
     blackcount=parseFloat(black[i].count);
     blackrate=blackcount/223868*10000
     break;
        }
         else{blackcount=0; blackrate=0;};
     };
         
     for(var i = 0; i < white.length; i++){
     if(white[i].word===word){
     whitecount=parseFloat(white[i].count);
     whiterate=whitecount/68465*10000
     break;
        }else{
     whitecount=0;
     whiterate=0; 
     };
     };
    
    dataset=[whiterate,blackrate];
    
    var newNumber=Math.random()/45-Math.random()/45
    yScale.domain([0, d3.max(dataset)*(1.2+newNumber)]);
    
svg.selectAll("rect")    
    .data(dataset)
    .transition()
    .duration(500)
    .attr("y", function(d) {return yScale(d);})
    .attr("height", function(d) {return h-padding-yScale(d);});

svg.selectAll("text")
    .data(dataset)
    .transition()
    .duration(500)
    .text(function(d) {return Math.round(d * 100) / 100;})
    .attr("y", function(d) {return yScale(d)-7;});
    
svg.select(".axis")
    .transition()
    .duration(500)
    .call(yAxis);
    
//maps counts to HTML
document.getElementById("whitecount").innerHTML = whitecount;
document.getElementById("blackcount").innerHTML = blackcount;


};
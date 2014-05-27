function checkFilled () {

  var inputVal = document.getElementById("searchBox").value;
  console.log(inputVal);
  var circleId = d3.select("#" + inputVal + "");

  var cities = [];


  d3.selectAll("circle").each(function(d,i){
    
    var myId = d3.select(this).attr("id");
    
    cities.push(myId);
  
  });
  

  cities.forEach(function ( city ) {
  
    if ( inputVal == city ){

          circleId.style("fill", "tomato");

                 
      }
  })
  
}